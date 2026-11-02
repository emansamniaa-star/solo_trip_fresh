import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../common/Input'
import Button from '../common/Button'
import { loginUser } from '../../api/auth'

export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSaving(true)

    try {
      const user = await loginUser({ email, password })
      localStorage.setItem('soloTripUser', JSON.stringify(user))
      navigate('/profile')
    } catch (err) {
      setError(err.message || 'Could not log in.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-md space-y-5">
      <Input
        id="login-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />
      <Input
        id="login-password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />

      {error && <p className="text-sm text-red-700">{error}</p>}

      <Button type="submit" className="w-full sm:w-auto" disabled={saving}>
        {saving ? 'Logging in…' : 'Log in'}
      </Button>
      <p className="text-sm text-stone-600">
        New here?{' '}
        <Link to="/register" className="font-semibold text-amber-900 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  )
}