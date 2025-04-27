import pool from "./pool";
import { Shipment, Customer } from "../types/shipment";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export async function saveShipmentsToDB(shipments: Shipment[]) {
  for (const shipment of shipments) {
    const customer: Customer = shipment.customer;

    await pool.query(
      `INSERT INTO customers (name, address, city, country, lat, \`long\`)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name = VALUES(name), address = VALUES(address)`,
      [
        customer.name,
        customer.address,
        customer.city,
        customer.country,
        customer.lat,
        customer.long,
      ]
    );

    const [customerRows]: any = await pool.query(
      `SELECT id FROM customers WHERE name = ? AND address = ?`,
      [customer.name, customer.address]
    );
    const customerId = customerRows[0]?.id;

    await pool.query(
      `INSERT INTO shipments (id, start, end, expected_delivery, carrier, status, customer_id, last_updated_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE status = VALUES(status), last_updated_date = VALUES(last_updated_date)`,
      [
        shipment.id,
        formatDate(shipment.start),
        formatDate(shipment.end),
        formatDate(shipment.expected_delivery),
        shipment.carrier,
        shipment.status,
        customerId,
        formatDate(shipment.last_updated_date),
      ]
    );
  }
}
