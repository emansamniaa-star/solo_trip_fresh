

import { Router } from 'express'
import { listExperiences, getExperienceById, createExperience } from '../controllers/experiences.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.get('/', listExperiences)
router.get('/:id', getExperienceById)
router.post('/', requireAuth, createExperience)
export default router