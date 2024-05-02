import { Hono } from 'hono'
import { cache } from 'hono/cache'
import { cors } from 'hono/cors'

const app = new Hono()

app.onError((error, req, res, next) => {
  console.log({error})
});

app.get('*', cache({
  cacheName: 'apis.is',
}))

app.use(cors())

app.get('/', (c) => c.redirect('https://docs.apis.is'))

export default app
