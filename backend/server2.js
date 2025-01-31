const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let cachedData = { riyadh: null, neighborhood: null }; 

// Scrape Riyadh Data
const scrapeRiyadh = async (page, dateRange) => {
  // console.log("Selecting 'الرياض' for city-wide data...");
  await page.waitForSelector('input#input-hints-city', { timeout: 60000 });
  await page.click('input#input-hints-city');

  const cityOptionSelector = 'button.inputWithHints__item[value="00100001"]';
  await page.waitForSelector(cityOptionSelector, { timeout: 60000 });
  await page.click(cityOptionSelector);
  // console.log("'الرياض' selected.");

  // Set Date Range
  // console.log(`Setting date range to ${dateRange} days for Riyadh...`);
  const dateRangeSelector = 'select#select-date-range';
  await page.waitForSelector(dateRangeSelector, { timeout: 60000 });
  const dateRangeValue = dateRange === "90" ? "90D" : "1Y";
  await page.select(dateRangeSelector, dateRangeValue);
  // console.log(`Date range set to ${dateRange} days.`);

  // Click Search Button
  // console.log("Clicking the search button for Riyadh data...");
  const searchButtonSelector = 'button.text-white.bg-blue-500';
  await page.waitForSelector(searchButtonSelector, { timeout: 60000 });
  await page.click(searchButtonSelector);

  // Wait for results
  // console.log("Waiting for Riyadh results...");
  await page.waitForFunction(() => {
    const totalDealsElement = document.querySelector(
      'li.salesKingdomCard__item.salesKingdomCard__item--transactionsNumber .dataGrid__value'
    );
    return totalDealsElement?.innerText.trim() !== "N/A";
  }, { timeout: 60000 });
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 5 seconds (adjust as necessary)

  // Scrape Data
  // console.log("Scraping Riyadh data...");
  const riyadhData = await page.evaluate(() => {
    const propertiesCount = document
      .querySelector('li.salesKingdomCard__item.salesKingdomCard__item--transactionsNumber .dataGrid__value')
      ?.innerText.trim();
    const totalValue = document
      .querySelector('li.salesKingdomCard__item.salesKingdomCard__item--totalSalesValue .dataGrid__value')
      ?.innerText.trim();
    const totalArea = document
      .querySelector('li.salesKingdomCard__item.salesKingdomCard__item--totalArea .dataGrid__value')
      ?.innerText.trim();

    return {
      TotalDeals: propertiesCount || "N/A",
      totalValues: totalValue || "N/A",
      totalAreas: totalArea || "N/A",
    };
  });

  // console.log("Riyadh data scraped successfully:", riyadhData);
  return riyadhData;
};

// Scrape Neighborhood Data
// Scrape Neighborhood Data
const scrapeNeighborhood = async (page, neighborhoodName, dateRange) => {
  // console.log(`Scraping neighborhood data for "${neighborhoodName}"...`);

  // Clear the city selection
  await page.evaluate(() => {
    document.querySelector('input#input-hints-city').value = "";
  });

  // Wait and click the neighborhood input
  await page.waitForSelector('input#input-hints-neighborhood', { timeout: 60000 });
  await page.click('input#input-hints-neighborhood');

  // Retrieve the list of neighborhoods
  const neighborhoods = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button.inputWithHints__item')).map(option => ({
      name: option.innerText.trim(),
      value: option.getAttribute('value'),
    }));
  });

  // Find and select the neighborhood
  const selectedNeighborhood = neighborhoods.find(n => n.name === neighborhoodName);
  if (!selectedNeighborhood) throw new Error(`Neighborhood "${neighborhoodName}" not found.`);

  // console.log(`Neighborhood "${neighborhoodName}" found.`);
  const neighborhoodOptionSelector = `button.inputWithHints__item[value="${selectedNeighborhood.value}"]`;
  await page.click(neighborhoodOptionSelector);

  // Set the date range
  // console.log(`Setting date range to ${dateRange} days for neighborhood...`);
  const dateRangeSelector = 'select#select-date-range';
  await page.waitForSelector(dateRangeSelector, { timeout: 60000 });
  const dateRangeValue = dateRange === "90" ? "90D" : "1Y";
  await page.select(dateRangeSelector, dateRangeValue);

  // Click Search Button
  // console.log("Clicking search button for neighborhood...");
  const searchButtonSelector = 'button.text-white.bg-blue-500';
  await page.waitForSelector(searchButtonSelector, { timeout: 60000 });
  await page.click(searchButtonSelector);

  // Wait for results to update dynamically
  // console.log("Waiting for neighborhood results...");
  await page.waitForFunction(() => {
    const totalDealsElement = document.querySelector(
      'li.salesKingdomCard__item.salesKingdomCard__item--transactionsNumber .dataGrid__value'
    );
    return totalDealsElement?.innerText.trim() !== "N/A";
  }, { timeout: 60000 });
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 5 seconds (adjust as necessary)

  // Scrape Data
  // console.log("Scraping neighborhood data...");
  const neighborhoodData = await page.evaluate(() => {
    const propertiesCount = document
      .querySelector('li.salesKingdomCard__item.salesKingdomCard__item--transactionsNumber .dataGrid__value')
      ?.innerText.trim();
    const totalValue = document
      .querySelector('li.salesKingdomCard__item.salesKingdomCard__item--totalSalesValue .dataGrid__value')
      ?.innerText.trim();
    const totalArea = document
      .querySelector('li.salesKingdomCard__item.salesKingdomCard__item--totalArea .dataGrid__value')
      ?.innerText.trim();

    return {
      TotalDeals: propertiesCount || "N/A",
      totalValues: totalValue || "N/A",
      totalAreas: totalArea || "N/A",
    };
  });

  // console.log("Neighborhood data scraped successfully:", neighborhoodData);
  return neighborhoodData;
};


// Scrape Endpoint
app.post("/scrape", async (req, res) => {
  const { neighborhoodName, dateRange } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto("https://rei.rega.gov.sa/", { waitUntil: "domcontentloaded" });
    // console.log("Main page loaded successfully.");

    // Scrape Riyadh Data
    cachedData.riyadh = await scrapeRiyadh(page, dateRange);

    // Scrape Neighborhood Data if provided
    if (neighborhoodName) {
      cachedData.neighborhood = await scrapeNeighborhood(page, neighborhoodName, dateRange);
    }

    await browser.close();
    res.json({ message: "Scraping successful", data: cachedData });
  } catch (error) {
    res.status(500).json({ error: "Scraping failed", details: error.message });
  }
});

// Data Endpoint
app.get("/data", (req, res) => {
  res.json(cachedData);
});

const PORT = 5500;
app.listen(PORT);
