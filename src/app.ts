import express from "express";
import { GuruSheepData } from "./models/guruSheepModel.js";
import guruSheepRoutes from "./routes/guruSheepRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/gurusheep", guruSheepRoutes);

export default app;
