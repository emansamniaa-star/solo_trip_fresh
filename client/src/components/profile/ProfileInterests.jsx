export default function ProfileInterests({ interests }) {
  return (
    <section className="mt-10">
      <h2
        className="text-xl font-semibold text-stone-900"
        style={{ fontFamily: 'Fraunces, serif' }}
      >
        Interests
      </h2>
      <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
        {interests.map((interest) => (
          <li
            key={interest}
            className="border border-stone-300 px-3 py-1.5 text-sm text-stone-800"
          >
            {interest}
          </li>
        ))}
      </ul>
    </section>
  )
}
