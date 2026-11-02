import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MessageThread from '../components/messaging/MessageThread'
import MessageComposer from '../components/messaging/MessageComposer'
import { mockConversations, mockThread } from '../data/mockMessages'

export default function MessageThreadPage() {
  const { conversationId } = useParams()
  const conversation = mockConversations.find(
    (item) => item.id === String(conversationId),
  )
  const [messages, setMessages] = useState(mockThread)

  if (!conversation) {
    return (
      <div className="px-5 py-12 sm:px-8 md:px-12">
        <h1
          className="text-3xl font-semibold text-stone-900"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Conversation not found
        </h1>
        <Link to="/messages" className="mt-6 inline-block font-semibold text-amber-900">
          ← Back to messages
        </Link>
      </div>
    )
  }

  function handleSend(text) {
    setMessages((prev) => [
      ...prev,
      { id: `local-${prev.length + 1}`, fromMe: true, text },
    ])
  }

  return (
    <div className="px-5 py-12 sm:px-8 md:px-12">
      <Link
        to="/messages"
        className="text-sm font-semibold text-stone-600 hover:text-stone-900"
      >
        ← All messages
      </Link>
      <h1
        className="mt-8 text-3xl font-semibold text-stone-900"
        style={{ fontFamily: 'Fraunces, serif' }}
      >
        Chat with {conversation.withUser}
      </h1>
      <p className="mt-2 text-stone-500">{conversation.tripLabel}</p>
      <MessageThread messages={messages} />
      <MessageComposer onSend={handleSend} />
    </div>
  )
}
