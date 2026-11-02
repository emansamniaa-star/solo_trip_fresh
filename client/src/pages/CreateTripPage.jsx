import PageHeader from '../components/common/PageHeader'
import CreateTripForm from '../components/trips/CreateTripForm'

export default function CreateTripPage() {
  return (
    <div className="px-5 py-12 sm:px-8 md:px-12">
      <PageHeader
        title="Create a trip listing"
        subtitle="Share where you’re going, when, and what kind of companion you’re hoping to meet."
      />
      <CreateTripForm />
    </div>
  )
}
