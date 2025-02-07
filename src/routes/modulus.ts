import { Hono } from 'hono'

export const modulusRoute = new Hono()

modulusRoute.post(async (c) => {
  const { a, b } = await c.req.json()
  return c.json({ result: a % b })
})