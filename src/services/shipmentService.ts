import axios from "axios";
import https from "https";
import { Shipment } from "../types/shipment";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export async function fetchShipments(): Promise<Shipment[]> {
  const auth = {
    username: process.env.ABC_FASHION_USER || "",
    password: process.env.ABC_FASHION_PASS || "",
  };

  const res = await axios.get(`${process.env.ABC_FASHION_API}`, {
    auth,
    httpsAgent,
  });

  // console.log("response", res.data.data);
  return res.data.data;
}
