import './env.js'
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { orderedPair } from '../models/message.model.js'

test('orderedPair always puts the smaller user id first', () => {
  assert.deepEqual(orderedPair(4, 2), [2, 4])
  assert.deepEqual(orderedPair(2, 4), [2, 4])
  assert.deepEqual(orderedPair('3', '3'), [3, 3])
})
