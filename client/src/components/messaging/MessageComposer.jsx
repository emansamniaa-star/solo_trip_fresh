import { useState } from 'react'
import Button from '../common/Button'

export default function MessageComposer({ onSend }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="message-box">
        Write a message
      </label>
      <input
        id="message-box"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a message…"
        className="w-full border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-amber-700"
      />
      <Button type="submit">Send</Button>
    </form>
  )
}
