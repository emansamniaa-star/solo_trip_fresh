import { authHeaders } from './session'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {}

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  if (auth) {
    Object.assign(headers, authHeaders())
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data.error || 'Request failed')
    error.status = response.status
    throw error
  }

  return data
}
