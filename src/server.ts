import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { connectToMongo } from "./services/mongoConnection.js";
import cron from "node-cron";
import {
  fetchAndStoreSheepData,
  clearGuruSheepData,
} from "./services/fetchSheepFromGuru.js";
import { fetchAndStoreChopRates } from "./services/fetchChopRatesFromWGP.js";
import { fetchingLogger } from "./services/winstonLogger.js";
import app from "./app.js";

const PORT = process.env.PORT as string;
const MONGODB_URI = process.env.MONGODB_URI as string;
const GURU_URL = process.env.GURU_URL as string;
const WGP_URL = process.env.WGP_URL as string;

// console.log(process.env); // // For testing only

// Connect to MongoDB
connectToMongo(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Schedule to fetch sheepData from Guru every 10 min
cron.schedule("*/10 * * * *", async () => {
  fetchingLogger.info("Fetching and storing SHEEP DATA - Task started");
  try {
    await fetchAndStoreSheepData(GURU_URL);
    fetchingLogger.info(
      "Fetching and storing SHEEP DATA - Task completed successfully"
    );
  } catch (error) {
    fetchingLogger.error(
      "Error during fetching and storing SHEEP DATA:",
      error
    );
  }
});

// Schedule to fetch chopRates from WGP every 10 min
cron.schedule("*/10 * * * *", async () => {
  fetchingLogger.info("Fetching and storing CHOP RATES - Task started");
  try {
    await fetchAndStoreChopRates(WGP_URL);
    fetchingLogger.info(
      "Fetching and storing CHOP RATES - Task completed successfully"
    );
  } catch (error) {
    fetchingLogger.error(
      "Error during fetching and storing CHOP RATES:",
      error
    );
  }
});

// Schedule to clear the database to run every day at 4:55 AM Berlin Time
cron.schedule(
  "55 4 * * *",
  async () => {
    fetchingLogger.info("Clearing up mongoDB - Task started");
    try {
      await clearGuruSheepData();
      fetchingLogger.info(
        "Task completed successfully: Clearing up DB and deleting all SHEEP documents fetched from Guru"
      );
    } catch (error) {
      fetchingLogger.error("Error during clearing up db:", error);
    }
  },
  { timezone: "Europe/Berlin" }
);
