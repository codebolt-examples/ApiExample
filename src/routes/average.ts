import { Hono } from 'hono'

export const averageRoute = new Hono()

averageRoute.post(async (c) => {
  const { a, b } = await c.req.json()
  return c.json({ result: (a + b) / 2 })
})