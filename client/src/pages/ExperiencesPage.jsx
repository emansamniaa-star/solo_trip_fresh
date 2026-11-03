import PageHeader from '../components/common/PageHeader'
import ExperienceCard from '../components/experiences/ExperienceCard'
import { mockStories } from '../data/mockStories'

export default function ExperiencesPage() {
  return (
    <div className="px-5 py-12 sm:px-8 md:px-12">
      <PageHeader
        title="Experiences & recommendations"
        subtitle="Safety tips, budget ideas, and local advice from the community."
      />
      <ul className="mt-10 list-none space-y-2 p-0">
        {mockStories.map((story) => (
          <ExperienceCard key={story.id} story={story} />
        ))}
      </ul>
    </div>
  )
}
