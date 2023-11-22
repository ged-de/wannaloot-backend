import mongoose from "mongoose";

const mongoURI: string = process.env.MONGODB_URI as string;

export const connectToMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};
