import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { logExternalCall } from '../utils/fileLogger.js'

if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL in .env')
}

const neonSql = neon(process.env.DATABASE_URL)

let runQuery = (strings, ...values) => neonSql(strings, ...values)

export async function sql(strings, ...values) {
  const started = Date.now()
  const statement = strings.join('?').replace(/\s+/g, ' ').trim().slice(0, 400)

  try {
    const result = await runQuery(strings, ...values)
    logExternalCall({
      service: 'neon-postgres',
      statement,
      ok: true,
      durationMs: Date.now() - started,
    })
    return result
  } catch (error) {
    logExternalCall({
      service: 'neon-postgres',
      statement,
      ok: false,
      durationMs: Date.now() - started,
      error: error.message,
    })
    throw error
  }
}

// Tests replace the Neon call with an in-memory query function.
export function setQueryRunnerForTests(runner) {
  runQuery = runner
}
