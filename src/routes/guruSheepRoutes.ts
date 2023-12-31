import express from "express";
import { getLatestGuruSheep } from "../controllers/guruSheepController.js";

const router = express.Router();

router.get("/latest", (req, res, next) => {
  getLatestGuruSheep(req, res).catch(next);
});

export default router;
