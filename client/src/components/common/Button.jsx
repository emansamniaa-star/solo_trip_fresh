import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-amber-200 text-stone-900 hover:bg-amber-100 focus-visible:outline-amber-700',
  secondary:
    'border border-stone-300 text-stone-900 hover:bg-stone-100 focus-visible:outline-stone-700',
  ghost:
    'border border-stone-100/60 text-stone-50 hover:bg-stone-50/10 focus-visible:outline-stone-100',
}

export default function Button({
  children,
  to,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
  title,
}) {
  const classes = `inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} title={title}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}
