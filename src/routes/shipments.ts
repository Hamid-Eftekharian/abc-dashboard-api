import { Router } from "express";
import { fetchShipments } from "../services/shipmentService";
import { saveShipmentsToDB } from "../db/SaveShipments";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const shipments = await fetchShipments();
    await saveShipmentsToDB(shipments);
    console.log("Shipments synced and saved to DB, count: ", shipments.length);
    res.json(shipments);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch or save shipments" });
  }
});

export default router;
