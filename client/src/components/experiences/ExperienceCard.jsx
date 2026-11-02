import { Link } from 'react-router-dom'

export default function ExperienceCard({ story }) {
  return (
    <li className="border-t border-stone-300 pt-6">
      <Link to={`/experiences/${story.id}`} className="block">
        <p className="text-xs font-semibold tracking-wide text-amber-800 uppercase">
          {story.tag}
        </p>
        <h2
          className="mt-2 text-2xl font-semibold text-stone-900"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          {story.title}
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          {story.place} · by {story.author}
        </p>
        <p className="mt-3 max-w-3xl text-stone-700">{story.excerpt}</p>
      </Link>
    </li>
  )
}
