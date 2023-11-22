import dotenv from "dotenv";
dotenv.config();

import { connectToMongo } from "./services/mongoConnection";
import app from "./app";

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToMongo();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
