import express from "express";
import { GuruSheepData } from "./models/guruSheepModel.js";
import guruSheepRoutes from "./routes/guruSheepRoutes.js";
import chopRatesRoutes from "./routes/chopRatesRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/gurusheep", guruSheepRoutes);
app.use("/api/choprates", chopRatesRoutes);

export default app;
