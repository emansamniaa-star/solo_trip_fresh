import os from 'node:os'
import path from 'node:path'

process.env.DATABASE_URL ||= 'postgresql://test:test@127.0.0.1/solo_trip_test'
process.env.JWT_SECRET ||= 'test-secret-for-coverage'
process.env.LOG_FILE ||= path.join(os.tmpdir(), 'solo-trip-test.log')
