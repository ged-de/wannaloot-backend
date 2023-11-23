import fetch from "node-fetch";
import * as cheerio from "cheerio";

import { ChopRates } from "../models/chopRatesModel.js";

// fetching the chop rates from a website, since we dont have API keys from WG
export async function fetchAndStoreChopRates(WGPUrl: string) {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    };
    // Fetch the HTML
    const response = await fetch(WGPUrl, { headers });
    const htmlData = await response.text();

    // Parsing HTML, extract chop rates data
    const dataRows = parseHTMLGetChopRates(htmlData);

    const now = Date.now();

    const ChopRatesData = {
      chopRates: {
        GRASS: dataRows[2],
        STONE: dataRows[3],
        WATER: dataRows[4],
        WOOD: dataRows[5],
      },
      updatedAt: now,
    };
    // Save chop rates to database
    const chopRatesData = new ChopRates(ChopRatesData);
    await chopRatesData.save();
  } catch (error) {
    console.error("Error fetching and storing chop rates data:", error);
  }
}

// Function to clear the GuruSheepData collection
export async function clearGuruSheepData() {
  try {
    await ChopRates.deleteMany({});
    console.log("Cleared all documents from chop rates database");
  } catch (error) {
    console.error("Error clearing Chop Rates from database:", error);
  }
}

function parseHTMLGetChopRates(htmlContent: string) {
  const $ = cheerio.load(htmlContent);

  // Traverse and find the specific div containing the table with rates
  const specificDiv = $("body > div > div > div").eq(1).find("> div");

  // Selecting the table body
  const tableBody = specificDiv.find("> div").eq(1).find("table > tbody");

  // Select the first 'tr' element within the 'tableBody' related to chop rates
  const firstRow = tableBody.find("tr").first();

  // Create an array to store the contents of each 'td'
  const tdContents: number[] = [];

  // Iterate over each 'td' element in the first row
  firstRow.find("td").each((index, element) => {
    // Extract the text content, convert it to a number, and add it to the array
    // Use parseFloat or parseInt depending on the expected number format
    const content = parseFloat($(element).text());
    // console.log("each element", content); // debugging only
    tdContents.push(content);
  });

  return tdContents;
}
