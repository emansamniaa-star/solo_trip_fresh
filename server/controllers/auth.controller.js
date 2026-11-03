import bcrypt from 'bcryptjs'
import * as userModel from '../models/user.model.js'
import { signToken } from '../utils/token.js'
import { optionalText, requireEmail, requirePassword, requiredText } from '../utils/validate.js'

function authResponse(user) {
  const token = signToken(user)
  return { user, token }
}

export async function register(req, res, next) {
  try {
    const firstName = requiredText(req.body.firstName, 'First name', 80)
    const city = requiredText(req.body.city, 'City', 80)
    const email = requireEmail(req.body.email)
    const password = requirePassword(req.body.password)
    const bio = optionalText(req.body.bio, 'Bio', 500)
    const travelStyle = optionalText(req.body.travelStyle, 'Travel style', 40)

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await userModel.createUser({
      firstName,
      city,
      email,
      passwordHash,
      bio,
      travelStyle,
    })

    res.status(201).json(authResponse(user))
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already registered' })
    }
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const email = requireEmail(req.body.email)
    const password = requirePassword(req.body.password)

    const user = await userModel.findUserByEmail(email)

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const ok = await bcrypt.compare(password, user.passwordHash)

    if (!ok) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const { passwordHash: _passwordHash, ...safeUser } = user
    res.json(authResponse(safeUser))
  } catch (error) {
    next(error)
  }
}

export async function me(req, res, next) {
  try {
    const user = await userModel.findUserById(req.user.id)

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}