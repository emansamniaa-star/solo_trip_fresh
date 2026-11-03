// Turn form text into a safe string, or stop the request with a 400 error.
export function requiredText(value, field, max) {
  const text = String(value ?? '').trim()

  if (!text) {
    const error = new Error(`${field} is required`)
    error.status = 400
    throw error
  }

  if (text.length > max) {
    const error = new Error(`${field} must be ${max} characters or fewer`)
    error.status = 400
    throw error
  }

  return text
}

export function optionalText(value, field, max) {
  const text = String(value ?? '').trim()

  if (text.length > max) {
    const error = new Error(`${field} must be ${max} characters or fewer`)
    error.status = 400
    throw error
  }

  return text
}

export function requireDate(value, field) {
  const text = String(value ?? '').trim()

  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const error = new Error(`${field} must be a YYYY-MM-DD date`)
    error.status = 400
    throw error
  }

  return text
}
