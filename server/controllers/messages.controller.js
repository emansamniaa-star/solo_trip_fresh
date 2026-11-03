import * as messageModel from '../models/message.model.js'
import * as tripModel from '../models/trip.model.js'
import { requiredText } from '../utils/validate.js'

function withFromMe(messages, userId) {
  return messages.map((message) => ({
    id: message.id,
    fromMe: Number(message.senderId) === Number(userId),
    text: message.text,
  }))
}

export async function listConversations(req, res, next) {
  try {
    const conversations = await messageModel.listConversations(req.user.id)
    res.json(conversations)
  } catch (error) {
    next(error)
  }
}

export async function getConversationThread(req, res, next) {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid conversation id' })
    }

    const conversation = await messageModel.findConversationForUser(id, req.user.id)

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' })
    }

    const messages = await messageModel.listMessages(id)
    res.json({
      ...conversation,
      messages: withFromMe(messages, req.user.id),
    })
  } catch (error) {
    next(error)
  }
}

export async function startConversation(req, res, next) {
  try {
    const tripId = Number(req.body.tripId)

    if (!Number.isInteger(tripId) || tripId < 1) {
      return res.status(400).json({ error: 'A valid trip is required' })
    }

    const text = requiredText(req.body.text, 'Message', 1000)
    const trip = await tripModel.findTripById(tripId)

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' })
    }

    if (!trip.hostUserId) {
      return res.status(400).json({
        error: 'This host does not have an account yet, so messaging is unavailable',
      })
    }

    if (Number(trip.hostUserId) === Number(req.user.id)) {
      return res.status(400).json({ error: 'You cannot message your own trip' })
    }

    const [participantA, participantB] = messageModel.orderedPair(req.user.id, trip.hostUserId)
    let conversation = await messageModel.findBetween(trip.id, participantA, participantB)

    if (!conversation) {
      try {
        conversation = await messageModel.createConversation({
          tripId: trip.id,
          participantA,
          participantB,
        })
      } catch (error) {
        if (error.code !== '23505') throw error
        conversation = await messageModel.findBetween(trip.id, participantA, participantB)
      }
    }

    const message = await messageModel.addMessage({
      conversationId: conversation.id,
      senderId: req.user.id,
      body: text,
    })

    res.status(201).json({
      conversationId: conversation.id,
      message: { id: message.id, fromMe: true, text: message.text },
    })
  } catch (error) {
    next(error)
  }
}

export async function sendMessage(req, res, next) {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid conversation id' })
    }

    const conversation = await messageModel.findConversationForUser(id, req.user.id)

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' })
    }

    const text = requiredText(req.body.text, 'Message', 1000)
    const message = await messageModel.addMessage({
      conversationId: id,
      senderId: req.user.id,
      body: text,
    })

    res.status(201).json({
      id: message.id,
      fromMe: true,
      text: message.text,
    })
  } catch (error) {
    next(error)
  }
}
