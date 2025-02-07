import { Hono } from 'hono'

export const squareRootRoute = new Hono()

squareRootRoute.post(async (c) => {
  const { a } = await c.req.json()
  if (a < 0) return c.json({ error: 'Square root of negative number is not allowed.' }, 400)
  return c.json({ result: Math.sqrt(a) })
})