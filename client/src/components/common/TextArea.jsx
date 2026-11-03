export default function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-stone-800">{label}</span>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="mt-2 w-full resize-y border border-stone-300 bg-white px-3 py-2.5 text-stone-900 outline-none transition focus:border-amber-700"
      />
    </label>
  )
}
