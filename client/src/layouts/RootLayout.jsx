import { NavLink, Outlet } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `text-sm font-semibold transition ${
    isActive ? 'text-amber-900' : 'text-stone-700 hover:text-stone-900'
  }`

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 md:px-12">
          <NavLink
            to="/"
            className="text-lg font-semibold tracking-tight text-stone-900"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Solo Trip
          </NavLink>

          <nav aria-label="Main" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <NavLink to="/search" className={linkClass}>
              Search
            </NavLink>
            <NavLink to="/experiences" className={linkClass}>
              Experiences
            </NavLink>
            <NavLink to="/trips/new" className={linkClass}>
              Create trip
            </NavLink>
            <NavLink to="/messages" className={linkClass}>
              Messages
            </NavLink>
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
            <NavLink to="/login" className={linkClass}>
              Log in
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-stone-200 px-5 py-10 sm:px-8 md:px-12">
        <p className="text-sm text-stone-500">
          Solo Trip — a safer way for Arab women to find travel companions.
        </p>
      </footer>
    </div>
  )
}
