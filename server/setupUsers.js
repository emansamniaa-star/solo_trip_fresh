import { ensureSchema } from './setupSchema.js'

ensureSchema()
  .then(() => {
    console.log('✅ users table is ready on Neon')
  })
  .catch((error) => {
    console.error('❌ setup users failed:', error)
    process.exit(1)
  })
