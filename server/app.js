import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/index.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'
import { requestLogger } from './middleware/requestLogger.js'


const app = express()

// Vite uses 5173 by default. 5174 is allowed too, in case the dev server
// was started on the next free port.
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
}))
app.use(express.json())
app.use(requestLogger)

app.use('/api', apiRoutes)

app.use(notFound)
app.use(errorHandler)

export default app