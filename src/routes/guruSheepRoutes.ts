import express from "express";
import { getLatestGuruSheep } from "../controllers/guruSheepController.js";

const router = express.Router();

router.get("/latest", getLatestGuruSheep);

export default router;
