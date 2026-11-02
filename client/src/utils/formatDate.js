export function formatTripDates(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const opts = { month: 'short', day: 'numeric' }
  const startText = start.toLocaleDateString('en-GB', opts)
  const endText = end.toLocaleDateString('en-GB', {
    ...opts,
    year: 'numeric',
  })

  return `${startText} – ${endText}`
}

export function formatShortDate(dateValue) {
  return new Date(dateValue).toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
