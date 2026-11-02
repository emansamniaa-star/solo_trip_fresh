

import 'dotenv/config'

import { sql } from './src/config/db.js'

async function setupUsers() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      city TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      bio TEXT NOT NULL DEFAULT '',
      travel_style TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  console.log('✅ users table is ready on Neon')
}

setupUsers().catch((error) => {
  console.error('❌ setup users failed:', error)
  process.exit(1)
})