import { sql } from '../config/db.js'

export async function findAllExperiences() {
  return sql`
    SELECT
      id,
      title,
      place,
      excerpt,
      tag,
      body,
      author,
      author_user_id AS "authorUserId",
      created_at AS "createdAt"
    FROM experiences
    ORDER BY created_at DESC
  `
}

export async function findExperienceById(id) {
  const rows = await sql`
    SELECT
      id,
      title,
      place,
      excerpt,
      tag,
      body,
      author,
      author_user_id AS "authorUserId",
      created_at AS "createdAt"
    FROM experiences
    WHERE id = ${id}
  `
  return rows[0] || null
}

export async function createExperience(data) {
  const rows = await sql`
    INSERT INTO experiences (
      title,
      place,
      excerpt,
      tag,
      body,
      author,
      author_user_id
    ) VALUES (
      ${data.title},
      ${data.place},
      ${data.excerpt},
      ${data.tag},
      ${data.body},
      ${data.author},
      ${data.authorUserId || null}
    )
    RETURNING
      id,
      title,
      place,
      excerpt,
      tag,
      body,
      author,
      author_user_id AS "authorUserId",
      created_at AS "createdAt"
  `
  return rows[0]
}
