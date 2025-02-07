import { Hono } from 'hono'

export const powerRoute = new Hono()

powerRoute.post(async (c) => {
  const { a, b } = await c.req.json()
  return c.json({ result: Math.pow(a, b) })
})