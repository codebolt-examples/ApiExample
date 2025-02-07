import { Hono } from 'hono'
import { addRoute } from './routes/add'
import { subtractRoute } from './routes/subtract'
import { multiplyRoute } from './routes/multiply'
import { divideRoute } from './routes/divide'
import { modulusRoute } from './routes/modulus'
import { powerRoute } from './routes/power'
import { averageRoute } from './routes/average'
import { squareRootRoute } from './routes/squareRoot'
import { authMiddleware } from './middleware/auth'
import { prettyJSON } from 'hono/pretty-json';
const app = new Hono()
app.use('*', prettyJSON());
// Middleware
app.use('*', authMiddleware)

// Routes
app.route('/add', addRoute)
app.route('/subtract', subtractRoute)
app.route('/multiply', multiplyRoute)
app.route('/divide', divideRoute)
app.route('/modulus', modulusRoute)
app.route('/power', powerRoute)
app.route('/average', averageRoute)
app.route('/square-root', squareRootRoute)

export default app
