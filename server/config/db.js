
import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL in .env')
}

// sql`...` runs real queries against your Neon Postgres
export const sql = neon(process.env.DATABASE_URL)