import Button from '../common/Button'

export default function TripHostCard({ trip }) {
  return (
    <section
      aria-label="Trip host"
      className="mt-12 border-t border-stone-300 pt-8"
    >
      <p className="text-sm font-semibold tracking-wide text-stone-500 uppercase">
        Travel host
      </p>

      <h2
        className="mt-2 text-2xl font-semibold text-stone-900"
        style={{ fontFamily: 'Fraunces, serif' }}
      >
        {trip.hostName}
      </h2>

      <p className="mt-2 max-w-xl text-stone-600">
        {trip.hostName} is planning this trip and is open to a full companion or
        overlapping days. Message to introduce yourself and compare dates.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button to="/messages">Message {trip.hostName}</Button>
        <Button variant="secondary" disabled title="Coming soon — requires consent">
          WhatsApp (soon)
        </Button>
      </div>

      <p className="mt-4 max-w-xl text-sm text-stone-500">
        Contact details stay private until both of you agree. WhatsApp sharing
        will be optional and consent-based.
      </p>
    </section>
  )
}
