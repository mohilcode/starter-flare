import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { createDB } from '@/api/db'
import type { BaseEnv } from '@/api/types/hono'

const GetUserByEmailSchema = z.object({
  email: z.string().email(),
})

/**
 * Get user info
 */
export const userRouter = new Hono<BaseEnv>().get(
  '/me',
  zValidator('query', GetUserByEmailSchema),
  async c => {
    try {
      const db = createDB(c.env)
      const { email } = c.req.valid('query')

      const user = await db.query.user.findFirst({
        where: (users, { eq }) => eq(users.email, email),
        columns: {
          id: true,
          email: true,
          name: true,
        },
      })

      if (!user) {
        throw new Error('User not found')
      }

      const session = c.get('session')
      const sessionUser = c.get('user')

      return c.json(
        {
          success: true,
          data: {
            user,
            session,
            sessionUser,
          },
          message: 'User found successfully',
        },
        200
      )
    } catch (error) {
      throw error
    }
  }
)
