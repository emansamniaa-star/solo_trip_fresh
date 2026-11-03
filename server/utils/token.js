
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev-only-change-me'
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
    },
    SECRET,
    { expiresIn: EXPIRES_IN },
  )
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET)
}