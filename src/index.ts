import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import shipmentRoutes from "./routes/shipments";
import { runMigrations } from "../src/db/migration";
import { generateShipmentMetrics } from "./services/metrics";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shipments", shipmentRoutes);

const PORT = process.env.PORT || 5000;

cron.schedule("*/15 * * * *", () => {
  // running cron job every 15min
  console.log("Running metrics job...");
  generateShipmentMetrics();
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await runMigrations();
  } catch (e) {
    console.error("Error running DB migrations");
  }
});
