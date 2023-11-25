#!/usr/bin/env ts-node

import puppeteer from 'puppeteer';
import pgPromise from 'pg-promise';

const DATABASE_CONFIG = {
  host: 'db',
  port: 5432,
  database: 'mydb',
  user: 'myuser',
  password: 'mypassword',
};

const MAX_PROPERTY_COUNT = 500;
const BASE_URL = 'https://www.sreality.cz/en/search/for-sale/apartments';

main();

async function main() {
  const browser = await launchBrowser();
  const page = await createPage(browser);

  await gotoPage(page, BASE_URL);

  const db = await setupDatabaseConnection();

  let allPropertyData = [];

  while (allPropertyData.length < MAX_PROPERTY_COUNT) {
    const currentPagePropertyData = await scrapePropertyListings(page, db);
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
  console.log('Done scraping.');

  await browser.close();
}

async function launchBrowser() {
  return await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

async function createPage(browser) {
  return await browser.newPage();
}

async function gotoPage(page, url) {
  await page.goto(url);
}

async function setupDatabaseConnection() {
  const pgp = pgPromise();
  const db = pgp(DATABASE_CONFIG);
  return db;
}

async function scrapePropertyListings(page, db) {
  const propertyData = [];
  const propertyElements = await page.$$('.property');

  for (const propertyElement of propertyElements) {
    const property = {} as any;
    property.title = await propertyElement.$eval('.title', (el) => el.textContent);
    property.locality = await propertyElement.$eval('.locality', (el) => el.textContent);

    const imgElements = await propertyElement.$$('img');
    property.image = await imgElements[0].getProperty('src').then((src) => src.jsonValue());

    clearObject(property);

    try {
      await db.none('INSERT INTO property_listings(title, locality, media) VALUES($1, $2, $3)', [
        property.title,
        property.locality,
        property.image,
      ]);
    } catch (error) {
      console.error('Error inserting data into the database:', error);
    }

    propertyData.push(property);
  }

  return propertyData;
}

function clearObject(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      obj[prop] = obj[prop].replace ? obj[prop].replace(/[\n\t]/g, '') : obj[prop]; // Remove newline and space characters
    }
  }
}