import { sql } from '../config/db.js'

// Always store the smaller user id first so two people share one conversation per trip.
export function orderedPair(firstUserId, secondUserId) {
  const a = Number(firstUserId)
  const b = Number(secondUserId)
  return a < b ? [a, b] : [b, a]
}

export async function listConversations(userId) {
  return sql`
    SELECT
      c.id,
      CASE
        WHEN c.participant_a = ${userId} THEN ub.first_name
        ELSE ua.first_name
      END AS "withUser",
      COALESCE(t.destination, '') AS "tripLabel",
      COALESCE(last_msg.body, '') AS "lastMessage",
      to_char(COALESCE(last_msg.created_at, c.created_at), 'YYYY-MM-DD') AS "updatedAt"
    FROM conversations c
    JOIN users ua ON ua.id = c.participant_a
    JOIN users ub ON ub.id = c.participant_b
    LEFT JOIN trips t ON t.id = c.trip_id
    LEFT JOIN LATERAL (
      SELECT body, created_at
      FROM messages m
      WHERE m.conversation_id = c.id
      ORDER BY m.id DESC
      LIMIT 1
    ) last_msg ON true
    WHERE c.participant_a = ${userId} OR c.participant_b = ${userId}
    ORDER BY COALESCE(last_msg.created_at, c.created_at) DESC
  `
}

export async function findConversationForUser(conversationId, userId) {
  const rows = await sql`
    SELECT
      c.id,
      CASE
        WHEN c.participant_a = ${userId} THEN ub.first_name
        ELSE ua.first_name
      END AS "withUser",
      COALESCE(t.destination, '') AS "tripLabel",
      COALESCE(last_msg.body, '') AS "lastMessage",
      to_char(COALESCE(last_msg.created_at, c.created_at), 'YYYY-MM-DD') AS "updatedAt"
    FROM conversations c
    JOIN users ua ON ua.id = c.participant_a
    JOIN users ub ON ub.id = c.participant_b
    LEFT JOIN trips t ON t.id = c.trip_id
    LEFT JOIN LATERAL (
      SELECT body, created_at
      FROM messages m
      WHERE m.conversation_id = c.id
      ORDER BY m.id DESC
      LIMIT 1
    ) last_msg ON true
    WHERE c.id = ${conversationId}
      AND (c.participant_a = ${userId} OR c.participant_b = ${userId})
  `
  return rows[0] || null
}

export async function findBetween(tripId, participantA, participantB) {
  const rows = await sql`
    SELECT id
    FROM conversations
    WHERE trip_id = ${tripId}
      AND participant_a = ${participantA}
      AND participant_b = ${participantB}
    LIMIT 1
  `
  return rows[0] || null
}

export async function createConversation({ tripId, participantA, participantB }) {
  const rows = await sql`
    INSERT INTO conversations (trip_id, participant_a, participant_b)
    VALUES (${tripId}, ${participantA}, ${participantB})
    RETURNING id
  `
  return rows[0]
}

export async function listMessages(conversationId) {
  return sql`
    SELECT
      id,
      sender_id AS "senderId",
      body AS text
    FROM messages
    WHERE conversation_id = ${conversationId}
    ORDER BY id ASC
  `
}

export async function addMessage({ conversationId, senderId, body }) {
  const rows = await sql`
    INSERT INTO messages (conversation_id, sender_id, body)
    VALUES (${conversationId}, ${senderId}, ${body})
    RETURNING id, body AS text
  `
  return rows[0]
}
