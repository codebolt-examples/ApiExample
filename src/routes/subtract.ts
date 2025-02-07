import { Hono } from 'hono'

export const subtractRoute = new Hono()

subtractRoute.post(async (c) => {
  const { a, b } = await c.req.json()
  return c.json({ result: a - b })
})