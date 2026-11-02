import { Link } from 'react-router-dom'

export default function ConversationList({ conversations }) {
  return (
    <ul className="mt-8 list-none space-y-0 border-t border-stone-300 p-0">
      {conversations.map((conversation) => (
        <li key={conversation.id} className="border-b border-stone-300">
          <Link
            to={`/messages/${conversation.id}`}
            className="block py-5 transition hover:bg-stone-100/80"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold text-stone-900">
                {conversation.withUser}
              </h2>
              <p className="text-sm text-stone-500">{conversation.updatedAt}</p>
            </div>
            <p className="mt-1 text-sm text-stone-500">{conversation.tripLabel}</p>
            <p className="mt-2 text-stone-700">{conversation.lastMessage}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
