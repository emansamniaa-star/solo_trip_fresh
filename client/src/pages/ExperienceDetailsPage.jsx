import { Link, useParams } from 'react-router-dom'
import { getStoryById } from '../data/mockStories'
import Button from '../components/common/Button'

export default function ExperienceDetailsPage() {
  const { storyId } = useParams()
  const story = getStoryById(storyId)

  if (!story) {
    return (
      <div className="px-5 py-12 sm:px-8 md:px-12">
        <h1
          className="text-3xl font-semibold text-stone-900"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Story not found
        </h1>
        <div className="mt-8">
          <Button to="/experiences">Back to experiences</Button>
        </div>
      </div>
    )
  }

  return (
    <article className="px-5 py-12 sm:px-8 md:px-12">
      <Link
        to="/experiences"
        className="text-sm font-semibold text-stone-600 hover:text-stone-900"
      >
        ← All experiences
      </Link>
      <p className="mt-8 text-xs font-semibold tracking-wide text-amber-800 uppercase">
        {story.tag}
      </p>
      <h1
        className="mt-2 max-w-3xl text-3xl font-semibold text-stone-900 md:text-5xl"
        style={{ fontFamily: 'Fraunces, serif' }}
      >
        {story.title}
      </h1>
      <p className="mt-3 text-stone-500">
        {story.place} · by {story.author}
      </p>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone-700">
        {story.body}
      </p>
    </article>
  )
}
