DROP TABLE IF EXISTS trips;

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  destination TEXT NOT NULL,
  departure_city TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget TEXT NOT NULL,
  travel_style TEXT NOT NULL,
  host_name TEXT NOT NULL,
  blurb TEXT NOT NULL,
  itinerary TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);