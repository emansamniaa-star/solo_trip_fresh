import { Router } from 'express'
import healthRoutes from './health.routes.js'
import tripsRoutes from './trips.routes.js'
import authRoutes from './auth.routes.js'
import experiencesRoutes from './experiences.routes.js'
import messagesRoutes from './message.routes.js'

const router = Router()

router.use(healthRoutes)
router.use('/trips', tripsRoutes)
router.use('/experiences', experiencesRoutes)
router.use('/messages', messagesRoutes)
router.use(authRoutes)

export default router
