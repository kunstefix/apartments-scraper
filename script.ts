import puppeteer from 'puppeteer';


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const baseUrl = 'https://www.sreality.cz/en/search/for-sale/apartments';
  await page.goto(baseUrl);

  async function scrapePropertyListings() {
    const propertyData = [];
    const propertyElements = await page.$$('.property');
    for (const propertyElement of propertyElements) {
      const property = {} as any;
      property.title = await propertyElement.$eval('.title', (el) => el.textContent);
      property.locality = await propertyElement.$eval('.locality', (el) => el.textContent);
      let images = [] as any;
      const imgElements = await propertyElement.$$('img');
      // take only 3 images
      imgElements.slice(0, 3).forEach(async (img) => {
        const src = await img.getProperty('src');
        images.push(await src.jsonValue());
      });
      property.images = images

      propertyData.push(property);
    }

    return propertyData;
  }

  let allPropertyData = [];

  while (allPropertyData.length < 100) {
    const currentPagePropertyData = await scrapePropertyListings();
    allPropertyData = allPropertyData.concat(currentPagePropertyData);
    console.log("allPropertyData", allPropertyData.length)
    await page.waitForSelector('a.paging-next', { timeout: 10000 }); // Adjust the timeout as needed
    const nextPageButton = await page.$('a.paging-next');
    if (!nextPageButton) {
      break; // No more pages to scrape
    }

    await nextPageButton.click();

  }

  console.log("scanned", allPropertyData.length);
  console.log("done")

  // clear all data of unnecessary characters
  allPropertyData.forEach(obj => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        obj[prop] = obj[prop].replace ? obj[prop].replace(/[\n\t]/g, '') : obj[prop]; // Remove newline and space characters
      }
    }
  });

  console.log("allPropertyData", allPropertyData)

  await browser.close();
})();