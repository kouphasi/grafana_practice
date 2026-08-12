import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import pino from 'pino'
import { prometheus } from '@hono/prometheus'

const app = new Hono()

const log = pino()

const { printMetrics, registerMetrics } = prometheus()

app.use(async (c, next) => {
  const start = performance.now()
  await next()
  log.info({
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    durationMs: Math.round(performance.now() - start)
  }, 'request')
})

app.use('*', registerMetrics)
app.get('/metrics', printMetrics)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 8080
}, (info) => {
  log.info({ port: info.port }, `Server is running on http://localhost:${info.port}`)
})
