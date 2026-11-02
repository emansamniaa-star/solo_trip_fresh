

import { Router } from 'express'
import { getHealth, getDbHealth } from '../controllers/health.controller.js'

const router = Router()

router.get('/health', getHealth)
router.get('/db-health', getDbHealth)

export default router