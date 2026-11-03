import { ensureSchema } from './setupSchema.js'

ensureSchema()
  .then(() => {
    console.log('✅ database schema is ready')
  })
  .catch((error) => {
    console.error('❌ setup failed:', error)
    process.exit(1)
  })
