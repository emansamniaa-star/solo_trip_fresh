import { logError } from '../utils/fileLogger.js'

export function errorHandler(err, req, res, _next) {
  const status = Number(err.status) || 500
  logError(`${req.method} ${req.originalUrl} ${status} ${err.stack || err.message}`)

  const publicMessage = status >= 500
    ? 'Internal server error'
    : (err.message || 'Request failed')

  res.status(status).json({ error: publicMessage })
}
