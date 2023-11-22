import fetch from "node-fetch";
import { GuruSheepData } from "../models/guruSheepModel.js";

export async function fetchAndStoreSheepData(GuruUrl: string) {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    };
    // const response = await fetch(process.env.GURU_URL as string, { headers });
    const response = await fetch(GuruUrl, { headers });
    const data = await response.json();

    const animalsData = new GuruSheepData(data);
    await animalsData.save();
  } catch (error) {
    console.error("Error fetching and storing animals data:", error);
  }
}
