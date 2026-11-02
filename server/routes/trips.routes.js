


import { Router } from 'express'
import {
  listTrips,
  getTripById,
  createTrip,
} from '../controllers/trips.controller.js'

const router = Router()

router.get('/', listTrips)
router.post('/', createTrip)
router.get('/:id', getTripById)

export default router