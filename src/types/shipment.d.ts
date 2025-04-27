export interface Customer {
  name: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  long: number;
}

export interface TrackingEvent {
  status: string;
  event_datetime: string;
}

export interface Shipment {
  id: string;
  start: string;
  expected_delivery: string;
  end: string;
  carrier: string;
  status: string;
  customer: Customer;
  tracking_events: TrackingEvent[];
  last_updated_date: string;
}
