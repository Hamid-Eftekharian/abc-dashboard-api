import express from "express";
import { fetchShipments } from "../services/shipmentService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const shipments = await fetchShipments();
    res.json(shipments);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Unable to fetch shipments" });
  }
});

export default router;
