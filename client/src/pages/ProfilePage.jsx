import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileInterests from '../components/profile/ProfileInterests'
import ProfileTrips from '../components/profile/ProfileTrips'
import { getTrips } from '../api/trips'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [myTrips, setMyTrips] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem('soloTripUser')
    if (!raw) {
      setUser(null)
      return
    }

    const savedUser = JSON.parse(raw)
    setUser(savedUser)

    async function loadMyTrips() {
      try {
        const trips = await getTrips()
        // MVP: match by host name until trips are linked to user id
        setMyTrips(
          trips.filter(
            (trip) =>
              trip.hostName?.toLowerCase() === savedUser.firstName?.toLowerCase(),
          ),
        )
      } catch (err) {
        console.error(err)
      }
    }

    loadMyTrips()
  }, [])

  if (!user) {
    return (
      <div className="px-5 py-12 sm:px-8 md:px-12">
        <h1
          className="text-3xl font-semibold text-stone-900"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          You’re not logged in
        </h1>
        <p className="mt-3 text-stone-600">
          Please{' '}
          <Link to="/login" className="font-semibold text-amber-900 hover:underline">
            log in
          </Link>{' '}
          or{' '}
          <Link
            to="/register"
            className="font-semibold text-amber-900 hover:underline"
          >
            create an account
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="px-5 py-12 sm:px-8 md:px-12">
      <ProfileHeader user={user} />
      <ProfileInterests interests={user.interests || []} />
      <ProfileTrips trips={myTrips} />
    </div>
  )
}