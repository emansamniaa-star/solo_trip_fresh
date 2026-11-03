export const mockUsers = [
  {
    id: 'u1',
    firstName: 'Layla',
    city: 'Cairo',
    bio: 'Museum lover and slow traveler. Prefer cultural days over nightlife.',
    travelStyle: 'Cultural',
    interests: ['History', 'Cafés', 'Photography'],
  },
  {
    id: 'u2',
    firstName: 'Nour',
    city: 'Dubai',
    bio: 'Budget backpacker who loves street food and early starts.',
    travelStyle: 'Backpacking',
    interests: ['Food', 'Hiking', 'Markets'],
  },
  {
    id: 'u3',
    firstName: 'Sara',
    city: 'Riyadh',
    bio: 'City breaks, ferries, and quiet museum afternoons.',
    travelStyle: 'City break',
    interests: ['Architecture', 'Coffee', 'Walking'],
  },
  {
    id: 'u4',
    firstName: 'Huda',
    city: 'Kuwait City',
    bio: 'Nature + culture mix. Calm pace, clear communication.',
    travelStyle: 'Nature & culture',
    interests: ['Beaches', 'Souqs', 'Day trips'],
  },
]

/** Demo "logged-in" profile until real auth exists */
export const currentUser = mockUsers[0]

export function getUserById(userId) {
  return mockUsers.find((user) => user.id === String(userId))
}
