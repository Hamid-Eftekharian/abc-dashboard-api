import pool from "../db/pool";

export async function generateShipmentMetrics() {
  try {
    const [rows]: any = await pool.query(`
      SELECT 
        DATE(start) AS date,
        COUNT(*) AS total_shipments,

        SUM(
          CASE 
            WHEN end > expected_delivery OR status IN ('failed_delivery', 'returned', 'lost') 
            THEN 1 ELSE 0 
          END
        ) AS delayed_shipments,

        SUM(
          CASE 
            WHEN end <= expected_delivery AND status NOT IN ('failed_delivery', 'returned', 'lost') 
            THEN 1 ELSE 0 
          END
        ) AS on_time_shipments,

        ROUND(
          (SUM(
            CASE 
              WHEN end <= expected_delivery AND status NOT IN ('failed_delivery', 'returned', 'lost') 
              THEN 1 ELSE 0 
            END
          ) / COUNT(*)) * 100, 2
        ) AS on_time_percentage,

        AVG(TIMESTAMPDIFF(HOUR, start, end)) AS average_delivery_time_hours

      FROM shipments
      GROUP BY DATE(start)
      ORDER BY date DESC
      LIMIT 1;
    `);

    const metric = rows[0];
    if (!metric) return;

    await pool.query(
      `INSERT INTO shipment_metrics (date, total_shipments, delayed_shipments, on_time_shipments, on_time_percentage, average_delivery_time_hours)
       VALUES (?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE
         total_shipments = VALUES(total_shipments),
         delayed_shipments = VALUES(delayed_shipments),
         on_time_shipments = VALUES(on_time_shipments),
         on_time_percentage = VALUES(on_time_percentage),
         average_delivery_time_hours = VALUES(average_delivery_time_hours)`,
      [
        metric.date,
        metric.total_shipments,
        metric.delayed_shipments,
        metric.on_time_shipments,
        metric.on_time_percentage,
        metric.average_delivery_time_hours,
      ]
    );

    console.log("Shipment metrics stored successfully:", metric);
  } catch (error) {
    console.error("Error in generate metrics:", error);
  }
}
