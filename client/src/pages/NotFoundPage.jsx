import Button from '../components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="px-5 py-24 text-center sm:px-8 md:px-12">
      <h1
        className="text-4xl font-semibold text-stone-900"
        style={{ fontFamily: 'Fraunces, serif' }}
      >
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-stone-600">
        That link doesn’t match any screen in Solo Trip yet.
      </p>
      <div className="mt-8 flex justify-center">
        <Button to="/">Go home</Button>
      </div>
    </div>
  )
}
