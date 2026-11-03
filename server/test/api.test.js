import './env.js'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { beforeEach, test } from 'node:test'
import request from 'supertest'
import app from '../app.js'
import { setQueryRunnerForTests } from '../config/db.js'

const store = {
  users: [],
  trips: [],
  experiences: [],
  conversations: [],
  messages: [],
  failNext: false,
  hideConversationOnce: false,
  forceConversationConflict: false,
}

function sameId(left, right) {
  return Number(left) === Number(right)
}

function conversationSummary(row, userId) {
  const otherId = sameId(row.participantA, userId) ? row.participantB : row.participantA
  const other = store.users.find((user) => sameId(user.id, otherId))
  const trip = store.trips.find((item) => sameId(item.id, row.tripId))
  const last = [...store.messages].reverse().find((item) => sameId(item.conversationId, row.id))

  return {
    id: row.id,
    withUser: other?.firstName || 'Traveler',
    tripLabel: trip?.destination || '',
    lastMessage: last?.text || '',
    updatedAt: '2026-11-03',
  }
}

async function fakeSql(strings, ...values) {
  const query = strings.join(' ').replace(/\s+/g, ' ')

  if (store.failNext) {
    store.failNext = false
    throw new Error('database unavailable')
  }

  if (query.includes('SELECT 1 AS connected')) {
    return [{ connected: 1 }]
  }

  if (query.includes('INSERT INTO users')) {
    const [firstName, city, email, passwordHash, bio, travelStyle] = values
    if (store.users.some((user) => user.email === email)) {
      const error = new Error('duplicate key')
      error.code = '23505'
      throw error
    }
    const row = {
      id: store.users.length + 1,
      firstName,
      city,
      email,
      passwordHash,
      bio: bio || '',
      travelStyle: travelStyle || '',
      createdAt: '2026-11-03T00:00:00.000Z',
    }
    store.users.push(row)
    const { passwordHash: _passwordHash, ...safe } = row
    return [safe]
  }

  if (query.includes('FROM users') && query.includes('WHERE email')) {
    const user = store.users.find((item) => item.email === values[0])
    return user ? [user] : []
  }

  if (query.includes('FROM users') && query.includes('WHERE id')) {
    const user = store.users.find((item) => sameId(item.id, values[0]))
    if (!user) return []
    const { passwordHash: _passwordHash, ...safe } = user
    return [safe]
  }

  if (query.includes('INSERT INTO trips')) {
    const [
      destination,
      departureCity,
      startDate,
      endDate,
      budget,
      travelStyle,
      hostName,
      hostUserId,
      blurb,
      itinerary,
    ] = values
    const row = {
      id: store.trips.length + 1,
      destination,
      departureCity,
      startDate,
      endDate,
      budget,
      travelStyle,
      hostName,
      hostUserId,
      blurb,
      itinerary: itinerary || '',
      createdAt: '2026-11-03T00:00:00.000Z',
    }
    store.trips.push(row)
    return [row]
  }

  if (query.includes('FROM trips') && query.includes('WHERE id')) {
    const trip = store.trips.find((item) => sameId(item.id, values[0]))
    return trip ? [trip] : []
  }

  if (query.includes('FROM trips')) {
    return [...store.trips]
  }

  if (query.includes('INSERT INTO experiences')) {
    const [title, place, excerpt, tag, body, author, authorUserId] = values
    const row = {
      id: store.experiences.length + 1,
      title,
      place,
      excerpt,
      tag,
      body,
      author,
      authorUserId,
      createdAt: '2026-11-03T00:00:00.000Z',
    }
    store.experiences.push(row)
    return [row]
  }

  if (query.includes('FROM experiences') && query.includes('WHERE id')) {
    const story = store.experiences.find((item) => sameId(item.id, values[0]))
    return story ? [story] : []
  }

  if (query.includes('FROM experiences')) {
    return [...store.experiences]
  }

  if (query.includes('INSERT INTO conversations')) {
    if (store.forceConversationConflict) {
      store.forceConversationConflict = false
      const error = new Error('duplicate conversation')
      error.code = '23505'
      throw error
    }
    const [tripId, participantA, participantB] = values
    const row = {
      id: store.conversations.length + 1,
      tripId,
      participantA,
      participantB,
    }
    store.conversations.push(row)
    return [{ id: row.id }]
  }

  if (query.includes('WHERE trip_id')) {
    if (store.hideConversationOnce) {
      store.hideConversationOnce = false
      return []
    }
    const [tripId, participantA, participantB] = values
    const row = store.conversations.find((item) =>
      sameId(item.tripId, tripId) &&
      sameId(item.participantA, participantA) &&
      sameId(item.participantB, participantB))
    return row ? [{ id: row.id }] : []
  }

  if (query.includes('WHERE c.id')) {
    const userId = values[0]
    const conversationId = values[1]
    const row = store.conversations.find((item) => sameId(item.id, conversationId))
    if (!row || (!sameId(row.participantA, userId) && !sameId(row.participantB, userId))) {
      return []
    }
    return [conversationSummary(row, userId)]
  }

  if (query.includes('FROM conversations')) {
    const userId = values[0]
    return store.conversations
      .filter((item) => sameId(item.participantA, userId) || sameId(item.participantB, userId))
      .map((item) => conversationSummary(item, userId))
  }

  if (query.includes('INSERT INTO messages')) {
    const [conversationId, senderId, body] = values
    const row = { id: store.messages.length + 1, conversationId, senderId, text: body }
    store.messages.push(row)
    return [{ id: row.id, text: body }]
  }

  if (query.includes('FROM messages')) {
    return store.messages
      .filter((item) => sameId(item.conversationId, values[0]))
      .map((item) => ({ id: item.id, senderId: item.senderId, text: item.text }))
  }

  throw new Error(`Unexpected query in test: ${query.slice(0, 160)}`)
}

setQueryRunnerForTests(fakeSql)

function resetStore() {
  store.users.length = 0
  store.trips.length = 0
  store.experiences.length = 0
  store.conversations.length = 0
  store.messages.length = 0
  store.failNext = false
  store.hideConversationOnce = false
  store.forceConversationConflict = false
}

beforeEach(resetStore)

const account = {
  firstName: 'Layla',
  city: 'Cairo',
  email: 'layla@example.com',
  password: 'travel123',
  bio: 'Calm traveler',
  travelStyle: 'Cultural',
}

const tripBody = {
  destination: 'Amman, Jordan',
  departureCity: 'Cairo',
  startDate: '2026-11-10',
  endDate: '2026-11-18',
  budget: 'Mid-range',
  travelStyle: 'Cultural',
  blurb: 'Museums and a day in Petra.',
  itinerary: 'Petra on day three.',
}

const storyBody = {
  title: 'A quiet morning',
  place: 'Amman, Jordan',
  excerpt: 'Start near Rainbow Street.',
  tag: 'Tips',
  body: 'The early streets were calm and easy to walk.',
}

async function register(overrides = {}) {
  const response = await request(app).post('/api/register').send({ ...account, ...overrides })
  assert.equal(response.status, 201)
  return response.body
}

function authHeader(token) {
  return { Authorization: `Bearer ${token}` }
}

test('health endpoints report the API and the database', async () => {
  const health = await request(app).get('/api/health')
  assert.equal(health.status, 200)
  assert.equal(health.body.ok, true)

  const database = await request(app).get('/api/db-health')
  assert.equal(database.status, 200)
  assert.equal(database.body.db.connected, 1)

  const log = fs.readFileSync(process.env.LOG_FILE, 'utf8')
  assert.match(log, /GET \/api\/health/)
})

test('a database failure is logged and hidden from the client', async () => {
  store.failNext = true
  const response = await request(app).get('/api/db-health')
  assert.equal(response.status, 500)
  assert.equal(response.body.error, 'Internal server error')
})

test('unknown routes return 404', async () => {
  const response = await request(app).get('/api/missing')
  assert.equal(response.status, 404)
  assert.match(response.body.error, /Route not found/)
})

test('register and login create a session and reject bad credentials', async () => {
  const created = await register()
  assert.equal(created.user.firstName, 'Layla')
  assert.equal(created.user.email, 'layla@example.com')
  assert.ok(created.token)

  const duplicate = await request(app).post('/api/register').send(account)
  assert.equal(duplicate.status, 409)

  const badEmail = await request(app).post('/api/register').send({ ...account, email: 'not-an-email' })
  assert.equal(badEmail.status, 400)

  const shortPassword = await request(app).post('/api/register').send({ ...account, email: 'b@example.com', password: '123' })
  assert.equal(shortPassword.status, 400)

  const login = await request(app).post('/api/login').send({
    email: 'Layla@Example.com',
    password: 'travel123',
  })
  assert.equal(login.status, 200)
  assert.equal(login.body.user.city, 'Cairo')

  const wrongPassword = await request(app).post('/api/login').send({
    email: 'layla@example.com',
    password: 'wrongpass',
  })
  assert.equal(wrongPassword.status, 401)

  const unknown = await request(app).post('/api/login').send({
    email: 'nobody@example.com',
    password: 'travel123',
  })
  assert.equal(unknown.status, 401)

  const me = await request(app).get('/api/me').set(authHeader(login.body.token))
  assert.equal(me.status, 200)
  assert.equal(me.body.email, 'layla@example.com')

  const missingToken = await request(app).get('/api/me')
  assert.equal(missingToken.status, 401)

  const badToken = await request(app).get('/api/me').set(authHeader('not-a-real-token'))
  assert.equal(badToken.status, 401)
})

test('trips can be listed, read, and created by a signed-in host', async () => {
  const { token } = await register()

  const created = await request(app)
    .post('/api/trips')
    .set(authHeader(token))
    .send(tripBody)
  assert.equal(created.status, 201)
  assert.equal(created.body.hostName, 'Layla')
  assert.equal(created.body.destination, 'Amman, Jordan')

  const listed = await request(app).get('/api/trips')
  assert.equal(listed.status, 200)
  assert.equal(listed.body.length, 1)

  const found = await request(app).get(`/api/trips/${created.body.id}`)
  assert.equal(found.status, 200)
  assert.equal(found.body.departureCity, 'Cairo')

  const missing = await request(app).get('/api/trips/999')
  assert.equal(missing.status, 404)

  const invalid = await request(app).get('/api/trips/0')
  assert.equal(invalid.status, 400)

  const backwards = await request(app)
    .post('/api/trips')
    .set(authHeader(token))
    .send({ ...tripBody, startDate: '2026-12-10', endDate: '2026-12-01' })
  assert.equal(backwards.status, 400)

  const anonymous = await request(app).post('/api/trips').send(tripBody)
  assert.equal(anonymous.status, 401)
})

test('experiences can be published and read', async () => {
  const { token } = await register()

  const created = await request(app)
    .post('/api/experiences')
    .set(authHeader(token))
    .send(storyBody)
  assert.equal(created.status, 201)
  assert.equal(created.body.author, 'Layla')

  const listed = await request(app).get('/api/experiences')
  assert.equal(listed.body.length, 1)

  const found = await request(app).get(`/api/experiences/${created.body.id}`)
  assert.equal(found.body.title, 'A quiet morning')

  const missing = await request(app).get('/api/experiences/40')
  assert.equal(missing.status, 404)

  const invalid = await request(app).get('/api/experiences/nope')
  assert.equal(invalid.status, 400)

  const incomplete = await request(app)
    .post('/api/experiences')
    .set(authHeader(token))
    .send({ title: 'Only a title' })
  assert.equal(incomplete.status, 400)
})

test('two travelers can open a conversation about a trip', async () => {
  const host = await register()
  const guest = await register({
    firstName: 'Nour',
    email: 'nour@example.com',
  })

  const trip = await request(app)
    .post('/api/trips')
    .set(authHeader(host.token))
    .send(tripBody)
  assert.equal(trip.status, 201)

  const ownMessage = await request(app)
    .post('/api/messages')
    .set(authHeader(host.token))
    .send({ tripId: trip.body.id, text: 'Hello me' })
  assert.equal(ownMessage.status, 400)

  const started = await request(app)
    .post('/api/messages')
    .set(authHeader(guest.token))
    .send({ tripId: trip.body.id, text: 'Could we overlap three days?' })
  assert.equal(started.status, 201)

  const inbox = await request(app).get('/api/messages').set(authHeader(guest.token))
  assert.equal(inbox.status, 200)
  assert.equal(inbox.body[0].withUser, 'Layla')
  assert.match(inbox.body[0].lastMessage, /overlap/)

  const thread = await request(app)
    .get(`/api/messages/${started.body.conversationId}`)
    .set(authHeader(host.token))
  assert.equal(thread.status, 200)
  assert.equal(thread.body.messages.length, 1)
  assert.equal(thread.body.messages[0].fromMe, false)

  const reply = await request(app)
    .post(`/api/messages/${started.body.conversationId}/messages`)
    .set(authHeader(host.token))
    .send({ text: 'Yes, the 12th works.' })
  assert.equal(reply.status, 201)
  assert.equal(reply.body.fromMe, true)

  const again = await request(app)
    .post('/api/messages')
    .set(authHeader(guest.token))
    .send({ tripId: trip.body.id, text: 'I will bring a scarf.' })
  assert.equal(again.status, 201)
  assert.equal(again.body.conversationId, started.body.conversationId)

  const stranger = await request(app).get('/api/messages/999').set(authHeader(host.token))
  assert.equal(stranger.status, 404)

  const badId = await request(app).post('/api/messages').set(authHeader(guest.token)).send({ tripId: 0, text: 'Hi' })
  assert.equal(badId.status, 400)

  const locked = await request(app).get('/api/messages')
  assert.equal(locked.status, 401)
})

test('a repeated conversation insert is reused instead of failing', async () => {
  const host = await register()
  const guest = await register({ firstName: 'Sara', email: 'sara@example.com' })
  const trip = await request(app).post('/api/trips').set(authHeader(host.token)).send(tripBody)

  store.conversations.push({
    id: 8,
    tripId: trip.body.id,
    participantA: 1,
    participantB: 2,
  })
  store.hideConversationOnce = true
  store.forceConversationConflict = true

  const response = await request(app)
    .post('/api/messages')
    .set(authHeader(guest.token))
    .send({ tripId: trip.body.id, text: 'Trying again.' })

  assert.equal(response.status, 201)
  assert.equal(response.body.conversationId, 8)
})

test('a trip with no host account cannot be messaged', async () => {
  const guest = await register({ firstName: 'Huda', email: 'huda@example.com' })
  store.trips.push({
    id: 50,
    destination: 'Muscat, Oman',
    departureCity: 'Kuwait City',
    startDate: '2026-12-01',
    endDate: '2026-12-08',
    budget: 'Comfort',
    travelStyle: 'Cultural',
    hostName: 'Old listing',
    hostUserId: null,
    blurb: 'A seeded listing.',
    itinerary: '',
    createdAt: '2026-11-03T00:00:00.000Z',
  })

  const response = await request(app)
    .post('/api/messages')
    .set(authHeader(guest.token))
    .send({ tripId: 50, text: 'Is this trip still open?' })

  assert.equal(response.status, 400)
  assert.match(response.body.error, /does not have an account/)
})

test('a missing user profile returns 401 from /me', async () => {
  const { token } = await register()
  store.users.length = 0

  const response = await request(app).get('/api/me').set(authHeader(token))
  assert.equal(response.status, 401)
  assert.equal(response.body.error, 'User not found')
})
