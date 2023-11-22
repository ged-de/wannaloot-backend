import mongoose from "mongoose";

export const connectToMongo = async (mongoURI: string): Promise<void> => {
  console.log("MongoDB URI:", mongoURI); // Debugging line

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};
