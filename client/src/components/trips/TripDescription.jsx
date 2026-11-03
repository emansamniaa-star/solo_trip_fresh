export default function TripDescription({ trip }) {
  return (
    <div className="mt-8 max-w-2xl space-y-6">
      <div>
        <h2
          className="text-xl font-semibold text-stone-900"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          About this trip
        </h2>
        <p className="mt-3 text-lg text-stone-700">{trip.blurb}</p>
      </div>
      {trip.itinerary ? (
        <div>
          <h2
            className="text-xl font-semibold text-stone-900"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Planned itinerary
          </h2>
          <p className="mt-3 text-stone-700">{trip.itinerary}</p>
        </div>
      ) : null}
    </div>
  )
}
