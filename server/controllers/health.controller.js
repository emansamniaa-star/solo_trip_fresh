import { sql } from '../config/db.js'

export function getHealth(req, res) {
  res.json({ ok: true, message: 'Solo Trip API is running' })
}

export async function getDbHealth(req, res, next) {
  try {
    const result = await sql`SELECT 1 AS connected`
    res.json({ ok: true, db: result[0] })
  } catch (error) {
    next(error)
  }
}