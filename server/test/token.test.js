import './env.js'
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { signToken, verifyToken } from '../utils/token.js'

test('signToken returns a token that verifyToken can read', () => {
  const token = signToken({ id: 7, email: 'layla@example.com', firstName: 'Layla' })
  const payload = verifyToken(token)

  assert.equal(payload.sub, 7)
  assert.equal(payload.email, 'layla@example.com')
  assert.equal(payload.firstName, 'Layla')
})

test('verifyToken rejects a token signed with a different secret', () => {
  const token = signToken({ id: 1, email: 'a@b.co', firstName: 'A' })
  const previous = process.env.JWT_SECRET
  process.env.JWT_SECRET = 'a-different-secret'

  assert.throws(() => verifyToken(token))

  process.env.JWT_SECRET = previous
})
