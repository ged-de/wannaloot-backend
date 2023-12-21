import fetch from "node-fetch";
import { GuruSheepData } from "../models/guruSheepModel.js";
import { logger } from "./logger.js";

export async function fetchAndStoreSheepData (GuruUrl: string): Promise<void> {
  const headers = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
  };
  try {
    // const response = await fetch(process.env.GURU_URL as string, { headers });
    const response = await fetch(GuruUrl, { headers });
    const data = await response.json();

    const sheepData = new GuruSheepData(data);
    if (typeof sheepData.updatedAt === "number" && sheepData.updatedAt > 0) {
      await sheepData.save();
    }
    logger.info("Fetching and storing SheepData...");
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error fetching and storing SheepData:", error.message);
    } else {
      // Handle cases where the error is not an Error instance
      logger.error("An unknown error occurred while fetching and storing SheepData:", error);
    }
  }
}

// Function to clear the GuruSheepData collection
export async function clearGuruSheepData (): Promise<void> {
  try {
    await GuruSheepData.deleteMany({});
    logger.info("Cleared all documents from GuruSheepData");
  } catch (error) {
    logger.error("Error clearing GuruSheepData:", error);
  }
}
