import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'
import { APP_BASE_URL, isDevelopment } from '@/api/constants/env'
import { getAuth } from '@/api/lib/auth'
import rpcRouter from '@/api/routes'
import type { BaseEnv } from '@/api/types/hono'

const app = new Hono<BaseEnv>()

const publicRoutes: string[] = []

app.use(contextStorage())

app.use('*', logger())
app.use('*', requestId())

app.get('/favicon.ico', c => c.body(null, 204))

app.use('*', async (c, next) => {
  return cors({
    origin: APP_BASE_URL,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 600,
  })(c, next)
})

app.use('*', async (c, next) => {
  if (isDevelopment) {
    return prettyJSON()(c, next)
  }
  await next()
})

app.use('*', async (c, next) => {
  const isPublicRoute = publicRoutes.some(route => {
    if (route.endsWith('*')) {
      return c.req.path.startsWith(route.slice(0, -1))
    }
    return c.req.path === route
  })

  if (isPublicRoute) {
    return next()
  }

  const auth = getAuth(c.env)
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }

  c.set('user', session.user)
  c.set('session', session.session)
  return next()
})

app.on(['POST', 'GET'], '/api/auth/*', c => {
  const auth = getAuth(c.env)
  return auth.handler(c.req.raw)
})

app.get('/api/', c => {
  return c.text('Hello, Universe!')
})

app.get('/api/dashboard', c => {
  return c.redirect(`${APP_BASE_URL}/dashboard`)
})

app.route('/api', rpcRouter)

app.get('/api/health', c =>
  c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  })
)

app.use('*', (c, next) => {
  return secureHeaders({
    strictTransportSecurity: isDevelopment ? false : 'max-age=31536000; includeSubDomains; preload',
    contentSecurityPolicy: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: true,
    originAgentCluster: true,
    referrerPolicy: 'strict-origin-when-cross-origin',
    xContentTypeOptions: true,
    xDnsPrefetchControl: true,
    xDownloadOptions: true,
    xFrameOptions: 'DENY',
    xPermittedCrossDomainPolicies: true,
    xXssProtection: '1; mode=block',
  })(c, next)
})

app.notFound(c => {
  return c.json(
    {
      message: 'Not Found',
      status: 404,
    },
    404
  )
})

export default app
