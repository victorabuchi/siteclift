'use strict'

const bcrypt = require('bcrypt')
const db = require('../db/index')

module.exports = async function authRoutes(fastify) {

  fastify.post('/api/auth/register', async (request, reply) => {
    const { email, password, full_name } = request.body

    if (!email || !password || !full_name) {
      return reply.status(400).send({ error: 'Email, password and full name are required' })
    }

    const existing = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )
    if (existing.rows[0]) {
      return reply.status(409).send({ error: 'An account with this email already exists' })
    }

    const password_hash = await bcrypt.hash(password, 12)

    const result = await db.query(
      `INSERT INTO users (email, password_hash, full_name)
       VALUES ($1, $2, $3)
       RETURNING id, email, full_name, plan`,
      [email, password_hash, full_name]
    )
    const user = result.rows[0]

    const token = fastify.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: '7d' }
    )

    return reply.status(201).send({ token, user })
  })

  fastify.post('/api/auth/login', async (request, reply) => {
    const { email, password } = request.body

    if (!email || !password) {
      return reply.status(400).send({ error: 'Email and password are required' })
    }

    const result = await db.query(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email]
    )
    const user = result.rows[0]

    if (!user) {
      return reply.status(401).send({ error: 'Invalid email or password' })
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return reply.status(401).send({ error: 'Invalid email or password' })
    }

    const token = fastify.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: '7d' }
    )

    return reply.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        plan: user.plan
      }
    })
  })

  fastify.get('/api/auth/me', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const result = await db.query(
      'SELECT id, email, full_name, plan, created_at FROM users WHERE id = $1',
      [request.user.id]
    )
    if (!result.rows[0]) {
      return reply.status(404).send({ error: 'User not found' })
    }
    return reply.send({ user: result.rows[0] })
  })

}