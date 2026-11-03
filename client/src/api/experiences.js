import { apiRequest } from './client'

export function getExperiences() {
  return apiRequest('/api/experiences')
}

export async function getExperienceById(id) {
  try {
    return await apiRequest(`/api/experiences/${id}`)
  } catch (error) {
    if (error.status === 404) return null
    throw error
  }
}

export function createExperience(story) {
  return apiRequest('/api/experiences', {
    method: 'POST',
    body: story,
    auth: true,
  })
}
