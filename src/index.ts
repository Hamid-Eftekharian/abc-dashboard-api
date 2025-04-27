import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import shipmentRoutes from "./routes/shipments";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shipments", shipmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
