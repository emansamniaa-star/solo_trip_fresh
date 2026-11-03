/**
 * Returns the number of overlapping calendar days between two inclusive ranges.
 * Example: A Oct 1–10, B Oct 5–15 → 6 shared days (5..10).
 */
export function countOverlapDays(startA, endA, startB, endB) {
  const aStart = new Date(startA)
  const aEnd = new Date(endA)
  const bStart = new Date(startB)
  const bEnd = new Date(endB)

  const overlapStart = aStart > bStart ? aStart : bStart
  const overlapEnd = aEnd < bEnd ? aEnd : bEnd

  if (overlapStart > overlapEnd) return 0

  const msPerDay = 1000 * 60 * 60 * 24
  return Math.floor((overlapEnd - overlapStart) / msPerDay) + 1
}

export function tripsOverlap(trip, filterStart, filterEnd) {
  if (!filterStart || !filterEnd) return true
  return countOverlapDays(trip.startDate, trip.endDate, filterStart, filterEnd) > 0
}
