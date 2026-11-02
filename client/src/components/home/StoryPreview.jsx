import { Link } from 'react-router-dom'

export default function StoryPreview({ story }) {
  return (
    <li>
      <Link
        to={`/experiences/${story.id}`}
        className="block border-t border-stone-300 pt-5 transition duration-300 hover:-translate-y-0.5 hover:border-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700"
      >
        <p className="text-xs font-semibold tracking-wide text-amber-800 uppercase">
          {story.tag}
        </p>
        <h3
          className="mt-2 text-xl font-semibold text-stone-900"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          {story.title}
        </h3>
        <p className="mt-1 text-sm text-stone-500">
          {story.place} · by {story.author}
        </p>
        <p className="mt-3 text-stone-700">{story.excerpt}</p>
      </Link>
    </li>
  )
}
