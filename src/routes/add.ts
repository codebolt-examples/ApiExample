import { Hono } from 'hono'

export const addRoute = new Hono()

addRoute.post(async (c) => {
  try {
    const { a, b } = await c.req.json()
    if (typeof a !== 'number' || typeof b !== 'number') {
      return c.json({ error: 'Both a and b must be numbers' }, 400)
    }
    return c.json({ result: a + b })
  } catch (error) {
    return c.json({ error: 'Invalid request data' }, 400)
  }
})