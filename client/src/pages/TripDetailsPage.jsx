import { useParams, Link } from 'react-router-dom'
import { getTripById } from '../data/mockTrips'
import { useEffect, useState } from 'react'
import TripHeader from '../components/trips/TripHeader'
import TripMeta from '../components/trips/TripMeta'
import TripDescription from '../components/trips/TripDescription'
import TripHostCard from '../components/trips/TripHostCard'
import Button from '../components/common/Button'

export default function TripDetailsPage() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    let cancelled = false
    async function loadTrip() {
      try {
        const data = await getTripById(tripId)
        if (!cancelled) {
          setTrip(data)
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) {
          setError('Could not load this trip.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    loadTrip()
    return () => {
      cancelled = true
    }
  }, [tripId])
  if (loading) {
    return (
      <div className="px-5 py-12 sm:px-8 md:px-12">
        <p className="text-stone-600">Loading trip…</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="px-5 py-12 sm:px-8 md:px-12">
        <p className="text-red-700">{error}</p>
      </div>
    )
  }
  if (!trip) {
    return (
      <div className="px-5 py-12 sm:px-8 md:px-12">
        <Link
          to="/search"
          className="text-sm font-semibold text-stone-600 transition hover:text-stone-900"
        >
          ← Back to search
        </Link>
        <h1
          className="mt-8 text-3xl font-semibold text-stone-900 md:text-4xl"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Trip not found
        </h1>
        <p className="mt-3 max-w-lg text-stone-600">
          We couldn’t find a trip with id{' '}
          <span className="font-semibold text-stone-900">{tripId}</span>.
        </p>
        <div className="mt-8">
          <Button to="/search">Browse trips</Button>
        </div>
      </div>
    )
  }

  return (
    <article className="px-5 py-12 sm:px-8 md:px-12">
      <TripHeader trip={trip} />
      <TripMeta trip={trip} />
      <TripDescription trip={trip} />
      <TripHostCard trip={trip} />
    </article>
  )
}
