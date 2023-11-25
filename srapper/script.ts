import puppeteer from 'puppeteer';
import pgPromise from 'pg-promise';

const pgp = pgPromise({/* Initialization Options */ });

const db = pgp('postgres://username:password@host:port/database');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const baseUrl = 'https://www.sreality.cz/en/search/for-sale/apartments';
  await page.goto(baseUrl);

  // Configure PostgreSQL database connection
  const pgp = pgPromise();
  const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'mydatabase',
    user: 'myuser',
    password: 'mypassword',
  });

  async function scrapePropertyListings() {
    const propertyData = [];
    const propertyElements = await page.$$('.property');
    for (const propertyElement of propertyElements) {
      const property = {} as any;
      property.title = await propertyElement.$eval('.title', (el) => el.textContent);
      property.locality = await propertyElement.$eval('.locality', (el) => el.textContent);
      let images = [];
      const imgElements = await propertyElement.$$('img');
      // Take only 3 images
      imgElements.slice(0, 3).forEach(async (img) => {
        const src = await img.getProperty('src');
        images.push(await src.jsonValue());
      });
      property.images = images;

      
      clearObject(property);
      // Insert scraped data into the PostgreSQL database
      try {
        await db.none('INSERT INTO property_listings(title, locality, images) VALUES($1, $2, $3)', [
          property.title,
          property.locality,
          JSON.stringify(property.images), // Store images as JSON
        ]);
      } catch (error) {
        console.error('Error inserting data into the database:', error);
      }

      propertyData.push(property);
    }

    return propertyData;
  }

  let allPropertyData = [];

  while (allPropertyData.length < 100) {
    const currentPagePropertyData = await scrapePropertyListings();
    allPropertyData = allPropertyData.concat(currentPagePropertyData);
    console.log('allPropertyData', allPropertyData.length);
    await page.waitForSelector('a.paging-next', { timeout: 10000 }); // Adjust the timeout as needed
    const nextPageButton = await page.$('a.paging-next');
    if (!nextPageButton) {
      break; // No more pages to scrape
    }

    await nextPageButton.click();
  }

  console.log('scanned', allPropertyData.length);
  console.log('done');

  // Clear all data of unnecessary characters
  //allPropertyData.forEach(clearObject);

  function clearObject(obj) {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        obj[prop] = obj[prop].replace ? obj[prop].replace(/[\n\t]/g, '') : obj[prop]; // Remove newline and space characters
      }
    }
  }

  //   console.log('allPropertyData', allPropertyData);

  await browser.close();
})();
