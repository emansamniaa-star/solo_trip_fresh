import { Link } from 'react-router-dom'
import { formatTripDates } from '../../utils/formatDate'

export default function TripPreview({ trip }) {
  return (
    <li>
      <Link
        to={`/trips/${trip.id}`}
        className="block border-t border-stone-300 pt-5 transition duration-300 hover:border-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700"
      >
        <p className="text-sm text-stone-500">
          {formatTripDates(trip.startDate, trip.endDate)}
        </p>
        <h3
          className="mt-2 text-xl font-semibold text-stone-900"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          {trip.destination}
        </h3>
        <p className="mt-1 text-sm text-stone-600">
          From {trip.departureCity} · {trip.travelStyle} · {trip.budget}
        </p>
        <p className="mt-3 text-stone-700">{trip.blurb}</p>
        <p className="mt-4 text-sm font-semibold text-stone-900">
          Hosted by {trip.hostName}
        </p>
      </Link>
    </li>
  )
}
