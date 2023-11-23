import { ChopRates } from "../models/chopRatesModel.js";
import { Request, Response } from "express";

export async function getLatestChopRates(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const latestDocument = await ChopRates.findOne().sort({ _id: -1 });
    if (latestDocument) {
      res.json(latestDocument);
    } else {
      res.status(404).json({ message: "No documents found" });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      message: "Error fetching the latest GuruSheepData",
      error: errorMessage,
    });
  }
}
