import puppeteer from 'puppeteer';


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const baseUrl = 'https://www.sreality.cz/en/search/for-sale/apartments';
  await page.goto(baseUrl);

  async function scrapePropertyListings() {
    const propertyData = [];

    // Write your code here to extract property data from the current page
    // Use page.evaluate to interact with the DOM and extract data

    // Example code to extract property data:
    const propertyElements = await page.$$('.property');
    for (const propertyElement of propertyElements) {
      const property = {} as any;
      property.title = await propertyElement.$eval('.title', (el) => el.textContent);
      property.locality = await propertyElement.$eval('.locality', (el) => el.textContent);
      let images = [] as any;
      const imgElements = await propertyElement.$$('img');
      imgElements.slice(0, 3).forEach(async (img) => {
        const src = await img.getProperty('src');
        images.push(await src.jsonValue());
      });
      property.images = images
      // Add more properties as needed

      propertyData.push(property);
    }

    return propertyData;
  }

  let allPropertyData = [];

  while (allPropertyData.length < 100) {
    const currentPagePropertyData = await scrapePropertyListings();
    allPropertyData = allPropertyData.concat(currentPagePropertyData);
    console.log("allPropertyData", allPropertyData.length)
    // Check if there is a loader on the page and wait for it to disappear
    /*  const loader = await page.$('.paging-next');
     if (loader) {
       await page.waitForSelector('.paging-next', { hidden: true, timeout: 30000 }); // Adjust the timeout as needed
     } */

    // Check if there is a "next page" button and click it
    await page.waitForSelector('a.paging-next', { timeout: 10000 }); // Adjust the timeout as needed
    const nextPageButton = await page.$('a.paging-next');
    if (!nextPageButton) {
      console.log("next page button not found")
      break; // No more pages to scrape
    }

    await nextPageButton.click();

    // Wait for some time to allow the page to load (you can adjust the wait time)
  }

  console.log("scanned", allPropertyData.length);
  console.log("done")
  console.log(allPropertyData)
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