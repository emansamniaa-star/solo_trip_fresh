export default function PageHeader({ title, subtitle }) {
  return (
    <header className="max-w-3xl">
      <h1
        className="text-3xl font-semibold text-stone-900 md:text-4xl"
        style={{ fontFamily: 'Fraunces, serif' }}
      >
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 text-stone-600 md:text-lg">{subtitle}</p>
      ) : null}
    </header>
  )
}
