
import jwt from 'jsonwebtoken'

function secret() {
  return process.env.JWT_SECRET || 'dev-only-change-me'
}

function expiresIn() {
  return process.env.JWT_EXPIRES_IN || '7d'
}

export function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
    },
    secret(),
    { expiresIn: expiresIn() },
  )
}

export function verifyToken(token) {
  return jwt.verify(token, secret())
}