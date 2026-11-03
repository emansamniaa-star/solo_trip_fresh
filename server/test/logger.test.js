import './env.js'
import fs from 'node:fs'
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { logError, logExternalCall, logInfo } from '../utils/fileLogger.js'
import { setQueryRunnerForTests, sql } from '../config/db.js'

test('info and error lines are written to the log file', () => {
  logInfo('server started')
  logError('sample failure')
  const text = fs.readFileSync(process.env.LOG_FILE, 'utf8')

  assert.match(text, /INFO server started/)
  assert.match(text, /ERROR sample failure/)
})

test('a successful database call is logged and returned', async () => {
  setQueryRunnerForTests(async () => [{ connected: 1 }])
  const rows = await sql`SELECT 1 AS connected`
  const text = fs.readFileSync(process.env.LOG_FILE, 'utf8')

  assert.deepEqual(rows, [{ connected: 1 }])
  assert.match(text, /external neon-postgres ok/)
})

test('a failed database call is logged and rethrown', async () => {
  setQueryRunnerForTests(async () => {
    throw new Error('database down')
  })

  await assert.rejects(() => sql`SELECT 1 AS connected`, /database down/)
  const text = fs.readFileSync(process.env.LOG_FILE, 'utf8')
  assert.match(text, /external neon-postgres error/)
})

test('logExternalCall records the service name', () => {
  logExternalCall({
    service: 'neon-postgres',
    statement: 'SELECT 1',
    ok: true,
    durationMs: 4,
  })
  const text = fs.readFileSync(process.env.LOG_FILE, 'utf8')
  assert.match(text, /external neon-postgres ok 4ms SELECT 1/)
})
