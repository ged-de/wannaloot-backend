import express from "express";
import { getLatestChopRates } from "../controllers/chopRatesController.js";

const router = express.Router();

router.get("/latest", (req, res, next) => {
  getLatestChopRates(req, res).catch(next);
}); // @ToDo: handle next

export default router;
