export default function ProfileHeader({ user }) {
  return (
    <header className="border-t border-stone-300 pt-8">
      <p className="text-sm font-semibold tracking-wide text-stone-500 uppercase">
        Your profile
      </p>
      <h1
        className="mt-2 text-3xl font-semibold text-stone-900 md:text-5xl"
        style={{ fontFamily: 'Fraunces, serif' }}
      >
        {user.firstName}
      </h1>
      <p className="mt-2 text-stone-600">
        Based in {user.city} · {user.travelStyle}
      </p>
      <p className="mt-4 max-w-2xl text-lg text-stone-700">{user.bio}</p>
    </header>
  )
}
