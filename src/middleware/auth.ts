import { Hono } from 'hono'

export const authMiddleware = new Hono()

authMiddleware.use('*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
//   if (!authHeader || authHeader !== 'Basic mysecrettoken') {
//     return c.json({ error: 'Unauthorized' }, 401)
//   }
  await next()
})