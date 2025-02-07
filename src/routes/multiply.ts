import { Hono } from 'hono'

export const multiplyRoute = new Hono()

multiplyRoute.post(async (c) => {
  const { a, b } = await c.req.json()
  return c.json({ result: a * b })
})