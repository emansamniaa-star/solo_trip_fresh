import fs from 'node:fs'
import path from 'node:path'

function logFilePath() {
  return process.env.LOG_FILE || path.join(process.cwd(), 'logs', 'server.log')
}

function write(level, message) {
  const line = `[${new Date().toISOString()}] ${level} ${message}`
  const file = logFilePath()
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.appendFileSync(file, `${line}\n`)
  return line
}

export function logInfo(message) {
  const line = write('INFO', message)
  console.log(line)
}

export function logError(message) {
  const line = write('ERROR', message)
  console.error(line)
}

// Database calls are external calls. The statement text has no parameter values,
// so passwords and message text stay out of the log file.
export function logExternalCall({ service, statement, ok, durationMs, error }) {
  const status = ok ? 'ok' : 'error'
  const detail = error ? ` error=${error}` : ''
  logInfo(`external ${service} ${status} ${durationMs}ms ${statement}${detail}`)
}
