import 'dotenv/config'
import { sql } from './config/db.js'



async function seedExperiences() {
  const existing = await sql`SELECT COUNT(*)::int AS count FROM experiences`
  if (Number(existing[0].count) > 0) {
    console.log('experiences already present, leaving them as they are')
    return
  }

  await sql`
    INSERT INTO experiences (title, place, excerpt, tag, body, author)
    VALUES (
      'Feeling safe in Amman’s downtown evenings',
      'Amman, Jordan',
      'Stick to well-lit streets near Rainbow Street, share your live location with a friend, and ask locals which taxis they trust.',
      'Safety',
      'I arrived after sunset and felt nervous at first. Staying on busy, lit streets and messaging a friend my location every hour made a big difference. Hotel staff also recommended trusted taxi numbers — ask before you need them.',
      'Layla'
    )
  `

  await sql`
    INSERT INTO experiences (title, place, excerpt, tag, body, author)
    VALUES (
      'Budget mornings in Marrakech',
      'Marrakech, Morocco',
      'Skip hotel breakfast once — fresh juice and msemen from a neighborhood stall costs little and starts conversations.',
      'Budget',
      'One morning outside the tourist belt taught me more than any guidebook. A small stall, a smile, and patience with language went further than rushing through a packed itinerary.',
      'Nour'
    )
  `

  await sql`
    INSERT INTO experiences (title, place, excerpt, tag, body, author)
    VALUES (
      'A quiet ferry hour in Istanbul',
      'Istanbul, Turkey',
      'Take the morning ferry to Kadıköy before the rush. Pack a scarf, sit outdoors, and watch the city wake up slowly.',
      'Tips',
      'The early ferry is my reset button on city trips. Less noise, softer light, and time to decide the day without pressure.',
      'Sara'
    )
  `

  await sql`
    INSERT INTO experiences (title, place, excerpt, tag, body, author)
    VALUES (
      'Dress and respect in Muscat markets',
      'Muscat, Oman',
      'Modest clothing kept me comfortable in souqs and mosques. Packing a light scarf saved space and stress.',
      'Etiquette',
      'I felt more at ease when my clothes matched the local tone. It was not about fear — it was about respect and blending in so I could enjoy conversations longer.',
      'Huda'
    )
  `

  console.log('✅ seeded experiences')
}

async function seed() {
  await sql`DELETE FROM messages`
  await sql`DELETE FROM conversations`
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
  await seedExperiences()
}

const experiencesOnly = process.argv[2] === 'experiences'

const task = experiencesOnly ? seedExperiences() : seed()

task.catch((error) => {
  console.error('❌ seed failed:', error)
  process.exit(1)
})