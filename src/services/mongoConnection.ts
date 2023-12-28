import mongoose from "mongoose";
import { logger } from "./logger.js";

export const connectToMongo = async (mongoURI: string): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    logger.info("Connected to MongoDB successfully");
  } catch (error) {
    logger.error("Failed to connect to MongoDB", error);
  }
};
