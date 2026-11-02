
import { sql } from './src/config/db.js'
async function setup() {
  // Remove the old simple table (and its 2 test rows)
  await sql`DROP TABLE IF EXISTS trips`

  // Create the full schema that matches the frontend trip fields
  await sql`
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
    )
  `

  console.log('✅ trips table reset with full schema on Neon')
}

setup().catch((error) => {
  console.error('❌ setup failed:', error)
  process.exit(1)
})