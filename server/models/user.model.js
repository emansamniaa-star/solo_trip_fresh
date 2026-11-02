
import { sql } from '../config/db.js'

export async function createUser(data) {
  const rows = await sql`
    INSERT INTO users (
      first_name,
      city,
      email,
      password_hash,
      bio,
      travel_style
    ) VALUES (
      ${data.firstName},
      ${data.city},
      ${data.email},
      ${data.passwordHash},
      ${data.bio || ''},
      ${data.travelStyle || ''}
    )
    RETURNING
      id,
      first_name AS "firstName",
      city,
      email,
      bio,
      travel_style AS "travelStyle",
      created_at AS "createdAt"
  `
  return rows[0]
}

export async function findUserByEmail(email) {
  const rows = await sql`
    SELECT
      id,
      first_name AS "firstName",
      city,
      email,
      bio,
      travel_style AS "travelStyle",
      password_hash AS "passwordHash",
      created_at AS "createdAt"
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `
  return rows[0] || null
}