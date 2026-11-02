import { Link } from 'react-router-dom'
import { formatTripDates } from '../../utils/formatDate'

export default function ProfileTrips({ trips }) {
  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2
          className="text-xl font-semibold text-stone-900"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Upcoming trips
        </h2>
        <Link
          to="/trips/new"
          className="text-sm font-semibold text-amber-900 hover:underline"
        >
          Create a trip →
        </Link>
      </div>

      {trips.length === 0 ? (
        <p className="mt-4 text-stone-600">No upcoming trips yet.</p>
      ) : (
        <ul className="mt-6 list-none space-y-4 p-0">
          {trips.map((trip) => (
            <li key={trip.id} className="border-t border-stone-300 pt-4">
              <Link to={`/trips/${trip.id}`} className="block">
                <p className="font-semibold text-stone-900">{trip.destination}</p>
                <p className="text-sm text-stone-500">
                  {formatTripDates(trip.startDate, trip.endDate)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
