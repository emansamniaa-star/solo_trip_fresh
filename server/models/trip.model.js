

import { sql } from '../config/db.js'

export async function findAllTrips() {
  return sql`
    SELECT
      id,
      destination,
      departure_city AS "departureCity",
      start_date AS "startDate",
      end_date AS "endDate",
      budget,
      travel_style AS "travelStyle",
      host_name AS "hostName",
      blurb,
      itinerary,
      created_at AS "createdAt"
    FROM trips
    ORDER BY start_date ASC
  `
}

export async function findTripById(id) {
  const rows = await sql`
    SELECT
      id,
      destination,
      departure_city AS "departureCity",
      start_date AS "startDate",
      end_date AS "endDate",
      budget,
      travel_style AS "travelStyle",
      host_name AS "hostName",
      blurb,
      itinerary,
      created_at AS "createdAt"
    FROM trips
    WHERE id = ${id}
  `
  return rows[0] || null
}

export async function createTrip(data) {
  const rows = await sql`
    INSERT INTO trips (
      destination,
      departure_city,
      start_date,
      end_date,
      budget,
      travel_style,
      host_name,
      blurb,
      itinerary
    ) VALUES (
      ${data.destination},
      ${data.departureCity},
      ${data.startDate},
      ${data.endDate},
      ${data.budget},
      ${data.travelStyle},
      ${data.hostName},
      ${data.blurb},
      ${data.itinerary || ''}
    )
    RETURNING
      id,
      destination,
      departure_city AS "departureCity",
      start_date AS "startDate",
      end_date AS "endDate",
      budget,
      travel_style AS "travelStyle",
      host_name AS "hostName",
      blurb,
      itinerary,
      created_at AS "createdAt"
  `
  return rows[0]
}