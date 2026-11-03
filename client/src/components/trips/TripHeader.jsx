import { Link } from 'react-router-dom'
import { formatTripDates } from '../../utils/formatDate'

export default function TripHeader({ trip }) {
  return (
    <header>
      <Link
        to="/search"
        className="text-sm font-semibold text-stone-600 transition hover:text-stone-900"
      >
        ← Back to search
      </Link>

      <p className="mt-8 text-sm text-stone-500">
        {formatTripDates(trip.startDate, trip.endDate)}
      </p>

      <h1
        className="mt-2 text-3xl font-semibold text-stone-900 md:text-5xl"
        style={{ fontFamily: 'Fraunces, serif' }}
      >
        {trip.destination}
      </h1>
    </header>
  )
}
