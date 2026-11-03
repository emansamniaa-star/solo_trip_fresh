import { logInfo } from '../utils/fileLogger.js'

export function requestLogger(req, res, next) {
  const started = Date.now()

  res.on('finish', () => {
    const ms = Date.now() - started
    logInfo(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`)
  })

  next()
}
