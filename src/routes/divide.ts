import { Hono } from 'hono'

export const divideRoute = new Hono()

divideRoute.post(async (c) => {
  const { a, b } = await c.req.json()
  if (b === 0) return c.json({ error: 'Division by zero is not allowed.' }, 400)
  return c.json({ result: a / b })
})