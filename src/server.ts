import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { connectToMongo } from "./services/mongoConnection.js";
import cron from "node-cron";
import { fetchAndStoreSheepData } from "./services/fetchSheepFromGuru.js";
import { guruLogger } from "./services/winstonLogger.js";
import app from "./app.js";

const PORT = process.env.PORT as string;
const MONGODB_URI = process.env.MONGODB_URI as string;
const GURU_URL = process.env.GURU_URL as string;

// console.log(process.env); // // For testing only

// Connect to MongoDB
connectToMongo(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

cron.schedule("*/10 * * * *", async () => {
  guruLogger.info("Fetching and storing animal data - Task started");
  try {
    await fetchAndStoreSheepData(GURU_URL);
    guruLogger.info(
      "Fetching and storing animal data - Task completed successfully"
    );
  } catch (error) {
    guruLogger.error("Error during fetching and storing animal data:", error);
  }
});
