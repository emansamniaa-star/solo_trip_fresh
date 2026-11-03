export default function SearchFilters({ filters, onChange }) {
  function update(field) {
    return (event) => onChange({ ...filters, [field]: event.target.value })
  }

  return (
    <form
      className="grid gap-4 border-t border-stone-300 pt-8 md:grid-cols-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="block md:col-span-2">
        <span className="text-sm font-semibold text-stone-800">Destination</span>
        <input
          type="search"
          value={filters.destination}
          onChange={update('destination')}
          placeholder="e.g. Amman, Istanbul"
          className="mt-2 w-full border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-amber-700"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-stone-800">Your start date</span>
        <input
          type="date"
          value={filters.startDate}
          onChange={update('startDate')}
          className="mt-2 w-full border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-amber-700"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-stone-800">Your end date</span>
        <input
          type="date"
          value={filters.endDate}
          onChange={update('endDate')}
          className="mt-2 w-full border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-amber-700"
        />
      </label>
    </form>
  )
}
