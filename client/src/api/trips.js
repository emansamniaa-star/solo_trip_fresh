
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function getTrips() {
  const response = await fetch(`${API_URL}/api/trips`)

  if (!response.ok) {
    throw new Error('Failed to fetch trips')
  }

  return response.json()
}

export async function getTripById(id) {
  const response = await fetch(`${API_URL}/api/trips/${id}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Failed to fetch trip')
  }

  return response.json()
}

export async function createTrip(tripData) {
  const response = await fetch(`${API_URL}/api/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripData),
  })

  if (!response.ok) {
    throw new Error('Failed to create trip')
  }

  return response.json()
}