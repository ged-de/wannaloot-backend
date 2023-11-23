import express from "express";
import { getLatestChopRates } from "../controllers/chopRatesController.js";

const router = express.Router();

router.get("/latest", getLatestChopRates);

export default router;
