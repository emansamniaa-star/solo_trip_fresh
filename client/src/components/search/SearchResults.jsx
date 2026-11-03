import { Link } from 'react-router-dom'
import { formatTripDates } from '../../utils/formatDate'
import { countOverlapDays } from '../../utils/dateOverlap'

export default function SearchResults({ trips, filters }) {
  if (trips.length === 0) {
    return (
      <p className="mt-10 text-stone-600">
        No trips match these filters. Try another destination or wider dates.
      </p>
    )
  }

  return (
    <ul className="mt-10 list-none space-y-8 p-0">
      {trips.map((trip) => {
        const overlap =
          filters.startDate && filters.endDate
            ? countOverlapDays(
                trip.startDate,
                trip.endDate,
                filters.startDate,
                filters.endDate,
              )
            : null

        return (
          <li key={trip.id} className="border-t border-stone-300 pt-6">
            <Link
              to={`/trips/${trip.id}`}
              className="block transition hover:border-amber-700"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3
                  className="text-2xl font-semibold text-stone-900"
                  style={{ fontFamily: 'Fraunces, serif' }}
                >
                  {trip.destination}
                </h3>
                {overlap !== null ? (
                  <p className="text-sm font-semibold text-amber-900">
                    {overlap > 0
                      ? `${overlap} overlapping day${overlap === 1 ? '' : 's'}`
                      : 'No date overlap'}
                  </p>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-stone-500">
                {formatTripDates(trip.startDate, trip.endDate)} · From{' '}
                {trip.departureCity}
              </p>
              <p className="mt-3 max-w-3xl text-stone-700">{trip.blurb}</p>
              <p className="mt-3 text-sm font-semibold text-stone-900">
                Hosted by {trip.hostName}
              </p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
