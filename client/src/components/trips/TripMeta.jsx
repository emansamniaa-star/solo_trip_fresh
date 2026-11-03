export default function TripMeta({ trip }) {
  return (
    <p className="mt-3 text-stone-600">
      From {trip.departureCity} · {trip.travelStyle} · {trip.budget}
    </p>
  )
}
