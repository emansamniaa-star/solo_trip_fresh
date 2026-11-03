export default function MessageThread({ messages }) {
  return (
    <ul className="mt-8 list-none space-y-4 p-0">
      {messages.map((message) => (
        <li
          key={message.id}
          className={`max-w-xl px-4 py-3 ${
            message.fromMe
              ? 'ml-auto bg-amber-100 text-stone-900'
              : 'bg-stone-200 text-stone-900'
          }`}
        >
          {message.text}
        </li>
      ))}
    </ul>
  )
}
