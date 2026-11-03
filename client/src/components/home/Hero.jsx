import { Link } from 'react-router-dom'
import Button from '../common/Button'

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"
        alt=""
        className="img-ken-burns absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-stone-950/80 via-stone-950/35 to-stone-950/10"
        aria-hidden="true"
      />

      <div className="w-full px-5 pb-14 pt-28 sm:px-8 md:px-12 md:pb-20">
        <p className="hero-rise mb-3 text-sm font-semibold tracking-[0.2em] text-amber-100/90 uppercase">
          Solo Trip
        </p>

        <h1
          className="hero-rise-delay max-w-3xl text-4xl leading-tight font-semibold text-stone-50 sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Find your travel companion
        </h1>

        <p className="hero-rise-delay-2 mt-4 max-w-xl text-base text-stone-200 md:text-lg">
          Connect with Arab women traveling to the same places, on overlapping
          dates — for the whole trip or just a day together.
        </p>

        <div className="hero-rise-delay-2 mt-8 flex flex-wrap gap-3">
          <Button to="/search">Find a companion</Button>
          <a
            href="#featured-trips"
            className="inline-flex items-center justify-center border border-stone-100/60 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-50/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-100"
          >
            Browse trips
          </a>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-amber-100 underline-offset-4 hover:underline"
          >
            Join the community
          </Link>
        </div>
      </div>
    </section>
  )
}
