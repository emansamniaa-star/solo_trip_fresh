import { Router } from 'express'
import {
  listConversations,
  getConversationThread,
  sendMessage,
  startConversation,
} from '../controllers/messages.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)
router.get('/', listConversations)
router.post('/', startConversation)
router.get('/:id', getConversationThread)
router.post('/:id/messages', sendMessage)
export default router