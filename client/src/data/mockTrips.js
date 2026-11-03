export const mockTrips = [
  {
    id: '1',
    destination: 'Amman, Jordan',
    departureCity: 'Cairo',
    startDate: '2026-11-10',
    endDate: '2026-11-18',
    budget: 'Mid-range',
    travelStyle: 'Cultural',
    hostName: 'Layla',
    hostId: 'u1',
    blurb:
      'Old souks, museums, and a day trip to Petra — looking for a calm companion.',
    itinerary:
      'Days in Amman for cafés and museums, one full day in Petra, optional Dead Sea evening.',
  },
  {
    id: '2',
    destination: 'Marrakech, Morocco',
    departureCity: 'Dubai',
    startDate: '2026-12-02',
    endDate: '2026-12-09',
    budget: 'Budget',
    travelStyle: 'Backpacking',
    hostName: 'Nour',
    hostId: 'u2',
    blurb:
      'Riads, street food, and Atlas foothills. Happy to share some days or the full week.',
    itinerary:
      'Medina walks, a cooking class, and a day trip toward the Atlas if energy allows.',
  },
  {
    id: '3',
    destination: 'Istanbul, Turkey',
    departureCity: 'Riyadh',
    startDate: '2027-01-15',
    endDate: '2027-01-22',
    budget: 'Comfort',
    travelStyle: 'City break',
    hostName: 'Sara',
    hostId: 'u3',
    blurb:
      'Mosques, ferries, and café mornings. Prefer overlapping a few days if not the whole trip.',
    itinerary:
      'Historic peninsula, Kadıköy ferry mornings, and one Bosphorus sunset walk.',
  },
  {
    id: '4',
    destination: 'Muscat, Oman',
    departureCity: 'Kuwait City',
    startDate: '2026-11-20',
    endDate: '2026-11-27',
    budget: 'Comfort',
    travelStyle: 'Nature & culture',
    hostName: 'Huda',
    hostId: 'u4',
    blurb:
      'Quiet beaches, Mutrah souq, and a wadi day — looking for a respectful pace companion.',
    itinerary:
      'Mutrah and old Muscat, one beach morning, optional wadi day trip.',
  },
]

export function getTripById(tripId) {
  return mockTrips.find((trip) => trip.id === String(tripId))
}
