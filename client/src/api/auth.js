
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to register')
  }

  return data
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to login')
  }

  return data
}