import { Router } from "express";
import { fetchShipments } from "../services/shipmentService";
import { saveShipmentsToDB } from "../db/SaveShipments";
import pool from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const shipments = await fetchShipments();
    console.log(shipments);
    await saveShipmentsToDB(shipments);
    console.log("Shipments synced and saved to DB, count: ", shipments.length);
    res.json(shipments);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch or save shipments" });
  }
});
router.get("/list", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        s.*, 
        c.name AS customer_name, 
        c.address, 
        c.city, 
        c.country, 
        c.lat, 
        c.long
      FROM shipments s
      JOIN customers c ON s.customer_id = c.id
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching shipment list:", error);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
});

export default router;
