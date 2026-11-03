import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  optionalText,
  requireDate,
  requireEmail,
  requirePassword,
  requiredText,
} from '../utils/validate.js'

test('requiredText trims and keeps a normal value', () => {
  assert.equal(requiredText('  Amman  ', 'Destination', 20), 'Amman')
})

test('requiredText rejects an empty value', () => {
  assert.throws(() => requiredText('   ', 'Destination', 20), /Destination is required/)
})

test('requiredText rejects a value that is too long', () => {
  assert.throws(() => requiredText('abcdef', 'Destination', 3), /3 characters or fewer/)
})

test('optionalText allows an empty value and rejects a long one', () => {
  assert.equal(optionalText(undefined, 'Itinerary', 10), '')
  assert.throws(() => optionalText('12345678901', 'Itinerary', 10), /Itinerary must be/)
})

test('requireDate accepts only YYYY-MM-DD', () => {
  assert.equal(requireDate('2026-11-10', 'Departure date'), '2026-11-10')
  assert.throws(() => requireDate('11/10/2026', 'Departure date'), /YYYY-MM-DD/)
})

test('requireEmail lowercases a valid address and rejects a bad one', () => {
  assert.equal(requireEmail('Layla@Example.com'), 'layla@example.com')
  assert.throws(() => requireEmail('layla'), /valid address/)
})

test('requirePassword enforces length bounds', () => {
  assert.equal(requirePassword('travel123'), 'travel123')
  assert.throws(() => requirePassword('short'), /at least 6/)
  assert.throws(() => requirePassword('x'.repeat(73)), /72 characters/)
})
