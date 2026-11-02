import { useEffect, useState } from 'react'
import { getTrips } from '../../api/trips'
import TripPreview from './TripPreview'

export default function FeaturedTrips() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadTrips() {
      try {
        const trips = await getTrips()
        if (!cancelled) {
          setFeatured(trips.slice(0, 3))
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) {
          setError('Could not load trips from the server.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadTrips()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      id="featured-trips"
      aria-label="Featured trips"
      className="scroll-mt-24 bg-stone-50 px-5 py-16 sm:px-8 md:px-12 md:py-24"
    >
      <h2
        className="text-3xl font-semibold text-stone-900 md:text-4xl"
        style={{ fontFamily: 'Fraunces, serif' }}
      >
        Featured trips
      </h2>
      <p className="mt-3 max-w-2xl text-stone-600">
        Upcoming plans from women looking for a companion — same destination,
        overlapping dates.
      </p>

      {loading && <p className="mt-10 text-stone-600">Loading trips…</p>}
      {error && <p className="mt-10 text-red-700">{error}</p>}

      {!loading && !error && (
        <ul className="mt-10 grid list-none gap-10 p-0 md:mt-12 md:grid-cols-3 md:gap-8">
          {featured.map((trip) => (
            <TripPreview key={trip.id} trip={trip} />
          ))}
        </ul>
      )}
    </section>
  )
}