import pool from "./pool";

export async function runMigrations() {
  const sql = `
  CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  lat DOUBLE,
  \`long\` DOUBLE  
);

CREATE TABLE IF NOT EXISTS shipments (
  id VARCHAR(50) PRIMARY KEY,
  start DATETIME, 
  expected_delivery DATETIME,
  end DATETIME,
  carrier VARCHAR(255),
  status VARCHAR(50),
  last_updated_date DATETIME,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS shipment_metrics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  total_shipments INT DEFAULT 0,
  delayed_shipments INT DEFAULT 0, 
  on_time_shipments INT DEFAULT 0,
  on_time_percentage DECIMAL(5,2), 
  average_delivery_time_hours DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

  try {
    await pool.query(sql);
    console.log("Database schema migrated successfully.");
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}
