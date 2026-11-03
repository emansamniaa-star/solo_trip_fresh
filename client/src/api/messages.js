import { apiRequest } from './client'

export function getConversations() {
  return apiRequest('/api/messages', { auth: true })
}

export function getConversation(id) {
  return apiRequest(`/api/messages/${id}`, { auth: true })
}

export function startConversation({ tripId, text }) {
  return apiRequest('/api/messages', {
    method: 'POST',
    body: { tripId, text },
    auth: true,
  })
}

export function sendMessage(conversationId, text) {
  return apiRequest(`/api/messages/${conversationId}/messages`, {
    method: 'POST',
    body: { text },
    auth: true,
  })
}
