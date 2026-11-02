import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import SearchFilters from '../components/search/SearchFilters'
import SearchResults from '../components/search/SearchResults'
import { getTrips } from '../api/trips'
import { tripsOverlap } from '../utils/dateOverlap'

export default function SearchPage() {
  const [filters, setFilters] = useState({
    destination: '',
    startDate: '',
    endDate: '',
  })
  const [allTrips, setAllTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadTrips() {
      try {
        const trips = await getTrips()
        if (!cancelled) {
          setAllTrips(trips)
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

  const trips = useMemo(() => {
    const destination = filters.destination.trim().toLowerCase()

    return allTrips.filter((trip) => {
      const matchesDestination =
        !destination || trip.destination.toLowerCase().includes(destination)
      const matchesDates = tripsOverlap(trip, filters.startDate, filters.endDate)
      return matchesDestination && matchesDates
    })
  }, [allTrips, filters])

  return (
    <div className="px-5 py-12 sm:px-8 md:px-12">
      <PageHeader
        title="Search & matching"
        subtitle="Filter by destination and your travel window. We’ll highlight overlapping days."
      />
      <SearchFilters filters={filters} onChange={setFilters} />

      {loading && <p className="mt-10 text-stone-600">Loading trips…</p>}
      {error && <p className="mt-10 text-red-700">{error}</p>}

      {!loading && !error && (
        <SearchResults trips={trips} filters={filters} />
      )}
    </div>
  )
}