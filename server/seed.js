import 'dotenv/config'
import { sql } from './src/config/db.js'



async function seed() {
  await sql`DELETE FROM trips`

  await sql`
    INSERT INTO trips (
      destination, departure_city, start_date, end_date,
      budget, travel_style, host_name, blurb, itinerary
    ) VALUES (
      'Amman, Jordan',
      'Cairo',
      '2026-11-10',
      '2026-11-18',
      'Mid-range',
      'Cultural',
      'Layla',
      'Old souks, museums, and a day trip to Petra — looking for a calm companion.',
      'Days in Amman for cafés and museums, one full day in Petra, optional Dead Sea evening.'
    )
  `

  await sql`
    INSERT INTO trips (
      destination, departure_city, start_date, end_date,
      budget, travel_style, host_name, blurb, itinerary
    ) VALUES (
      'Marrakech, Morocco',
      'Dubai',
      '2026-12-02',
      '2026-12-09',
      'Budget',
      'Backpacking',
      'Nour',
      'Riads, street food, and Atlas foothills. Happy to share some days or the full week.',
      'Medina walks, a cooking class, and a day trip toward the Atlas if energy allows.'
    )
  `

  await sql`
    INSERT INTO trips (
      destination, departure_city, start_date, end_date,
      budget, travel_style, host_name, blurb, itinerary
    ) VALUES (
      'Istanbul, Turkey',
      'Riyadh',
      '2027-01-15',
      '2027-01-22',
      'Comfort',
      'City break',
      'Sara',
      'Mosques, ferries, and café mornings. Prefer overlapping a few days if not the whole trip.',
      'Historic peninsula, Kadıköy ferry mornings, and one Bosphorus sunset walk.'
    )
  `

  await sql`
    INSERT INTO trips (
      destination, departure_city, start_date, end_date,
      budget, travel_style, host_name, blurb, itinerary
    ) VALUES (
      'Helsinki, Finland',
      'Kuwait City',
      '2026-11-20',
      '2026-11-27',
      'Comfort',
      'Nature & culture',
      'Huda',
      'Quiet lakes, design cafés, and a sauna evening — looking for a calm winter companion.',
      'City walks in Helsinki, one museum day, optional day trip toward the archipelago.'
    )
  `

  const rows = await sql`SELECT id, destination FROM trips ORDER BY id`
  console.log('✅ seeded trips:')
  console.table(rows)
}

seed().catch((error) => {
  console.error('❌ seed failed:', error)
  process.exit(1)
})