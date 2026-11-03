const USER_KEY = 'soloTripUser'
const TOKEN_KEY = 'soloTripToken'

// Login and register both return { user, token }. Older responses were just the user.
export function saveSession(data) {
  const user = data?.user ?? data
  localStorage.setItem(USER_KEY, JSON.stringify(user))

  if (data?.token) {
    localStorage.setItem(TOKEN_KEY, data.token)
  }
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function clearSession() {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(TOKEN_KEY)
}

export function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
