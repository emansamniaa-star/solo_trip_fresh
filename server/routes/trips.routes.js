import { Router } from 'express'
import { listTrips, getTripById, createTrip } from '../controllers/trips.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.get('/', listTrips)
router.post('/', requireAuth, createTrip)
router.get('/:id', getTripById)
export default router