'use strict'

require('dotenv').config()

const fastify = require('fastify')({ logger: true })

fastify.register(require('@fastify/cors'), {
  origin: process.env.FRONTEND_URL || 'http://localhost:6001',
  credentials: true
})

fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET || 'siteclift_dev_secret'
})

fastify.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' })
  }
})

fastify.get('/health', async (request, reply) => {
  return {
    status: 'Siteclift backend is running',
    port: process.env.PORT || 6000,
    time: new Date().toISOString()
  }
})

fastify.register(require('./routes/auth'))


const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || 6000,
      host: '0.0.0.0'
    })
    console.log('Siteclift backend running on http://localhost:6000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()