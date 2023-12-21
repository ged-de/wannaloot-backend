import express, { type Request, type Response, type NextFunction } from "express";

// import { GuruSheepData } from './models/guruSheepModel.js'
import guruSheepRoutes from "./routes/guruSheepRoutes.js";
import chopRatesRoutes from "./routes/chopRatesRoutes.js";
import { logger } from "./services/logger.js";
const app = express();

app.use(express.json());
app.use("/api/gurusheep", guruSheepRoutes);
app.use("/api/choprates", chopRatesRoutes);

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack); // Log the error for debugging
  res.status(500).send("Internal Server Error");
});

export default app;
