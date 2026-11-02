

import bcrypt from 'bcryptjs'
import * as userModel from '../models/user.model.js'

export async function register(req, res, next) {
  try {
    const { firstName, city, email, password, bio = '', travelStyle = '' } = req.body

    if (!firstName || !city || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await userModel.createUser({
      firstName,
      city,
      email: email.toLowerCase(),
      passwordHash,
      bio,
      travelStyle,
    })

    res.status(201).json(user)
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already registered' })
    }
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await userModel.findUserByEmail(email.toLowerCase())

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const ok = await bcrypt.compare(password, user.passwordHash)

    if (!ok) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const { passwordHash, ...safeUser } = user
    res.json(safeUser)
  } catch (error) {
    next(error)
  }
}