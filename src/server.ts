import dotenv from "dotenv";

import { connectToMongo } from "./services/mongoConnection.js";
import cron from "node-cron";
import {
  fetchAndStoreSheepData,
  clearGuruSheepData
} from "./services/fetchSheepFromGuru.js";
import { fetchAndStoreChopRates } from "./services/fetchChopRatesFromWGP.js";
import { logger } from "./services/logger.js";
import app from "./app.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;
const MONGODB_URI2 = process.env.MONGODB_URI2;
const GURU_URL = process.env.GURU_URL;
const WGP_URL = process.env.WGP_URL;

// console.log(process.env); // // For testing only

// Connect to MongoDB
if (MONGODB_URI2 === undefined || MONGODB_URI2 === "") {
  console.error("MONGODB URI is not defined");
  process.exit(1);
}

void connectToMongo(MONGODB_URI2);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Schedule to fetch sheepData from Guru every 10 min
// eslint-disable-next-line @typescript-eslint/no-misused-promises
cron.schedule("*/10 * * * *", async () => {
  logger.info("Fetching and storing SHEEP DATA - Task started");
  try {
    await fetchAndStoreSheepData(GURU_URL);
    logger.info(
      "Fetching and storing SHEEP DATA - Task completed successfully"
    );
  } catch (error) {
    logger.error(
      "Error during fetching and storing SHEEP DATA:",
      error
    );
  }
});

// Schedule to fetch chopRates from WGP every 10 min
// eslint-disable-next-line @typescript-eslint/no-misused-promises
cron.schedule("*/10 * * * *", async () => {
  logger.info("Fetching and storing CHOP RATES - Task started");
  try {
    await fetchAndStoreChopRates(WGP_URL);
    logger.info(
      "Fetching and storing CHOP RATES - Task completed successfully"
    );
  } catch (error) {
    logger.error(
      "Error during fetching and storing CHOP RATES:",
      error
    );
  }
});

// Schedule to clear the database to run every day at 4:55 AM Berlin Time
// eslint-disable-next-line @typescript-eslint/no-misused-promises
cron.schedule("55 4 * * *", async () => {
  logger.info("Clearing up mongoDB - Task started");
  try {
    await clearGuruSheepData();
    logger.info(
      "Task completed successfully: Clearing up DB and deleting all SHEEP documents fetched from Guru"
    );
  } catch (error) {
    logger.error("Error during clearing up db:", error);
  }
},
{ timezone: "Europe/Berlin" }
);
