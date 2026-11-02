import { Link } from 'react-router-dom'
import { mockStories } from '../../data/mockStories'
import StoryPreview from './StoryPreview'

export default function CommunityTeaser() {
  const stories = mockStories.slice(0, 3)

  return (
    <section
      aria-label="Community"
      className="bg-stone-100/70 px-5 py-16 sm:px-8 md:px-12 md:py-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            className="text-3xl font-semibold text-stone-900 md:text-4xl"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            From the community
          </h2>
          <p className="mt-3 max-w-2xl text-stone-600">
            Real tips and stories from Arab women who’ve been there — safety,
            budget, and local know-how.
          </p>
        </div>
        <Link
          to="/experiences"
          className="text-sm font-semibold text-amber-900 underline-offset-4 hover:underline"
        >
          View all experiences →
        </Link>
      </div>

      <ul className="mt-10 grid list-none gap-10 p-0 md:mt-12 md:grid-cols-3 md:gap-8">
        {stories.map((story) => (
          <StoryPreview key={story.id} story={story} />
        ))}
      </ul>
    </section>
  )
}
