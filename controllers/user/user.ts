import { Request, Response } from 'express'
import { User, CreateUser, ComfirmCreateUser, UserAccessToken } from '../../interfaces/user'
import { sendEmail, verifyEmail, generateCode } from '../../utils/utils'
import UserModel from '../../models/user/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })
const { JWT, TEST_MASTER_PWD } = process.env

const controller = {
  codeEmail: async function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): Promise<boolean> {
    const { res } = ctx
    const { email, test } = args.input

    if (verifyEmail(email)) {
      const code = (test !== null && test === TEST_MASTER_PWD) ? 1234 : generateCode()
      const hashInfo = jwt.sign({ email, code }, JWT as string)

      await sendEmail(email, code)

      res.cookie('verifyEmail', hashInfo, {
        httpOnly: true
      })

      return true
    }
    return false
  },

  verifyCode: function (root: any, args: ComfirmCreateUser, ctx: { req: Request, res: Response }): boolean {
    const { req, res } = ctx

    try {
      interface CookieInfo { email: string, code: number }
      const { email, code } = (jwt.verify(req.cookies.verifyEmail, JWT as string) as CookieInfo)

      res.clearCookie('verifyEmail')

      res.cookie('emailVerified', jwt.sign({ email }, JWT as string), {
        httpOnly: true
      })

      if (args.input.code === code &&
      args.input.email === email) {
        return true
      }
      return false
    } catch (err) {
      return false
    }
  },

  createUser: async function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): Promise<User | null> {
    const { req, res } = ctx

    try {
      const emailCookie = (jwt.verify(req.cookies.emailVerified, JWT as string)) as { email: string }
      args.input.email = emailCookie.email

      res.clearCookie('emailVerified')

      const user = await UserModel.createUser(args.input)
      delete user.__v

      res.cookie('refreshToken', jwt.sign({ user }, JWT as string), { httpOnly: true, maxAge: 60 * 60 * 24 * 50 })
      res.cookie('accessToken', jwt.sign({ user }, JWT as string), { httpOnly: true, maxAge: 60 * 60 * 15 })

      return user
    } catch (e) {
      return null
    }
  },

  deleteUser: async function (root: any, args: CreateUser, ctx: { req: Request, res: Response, user: UserAccessToken }): Promise<User | null> {
    const { res } = ctx
    try {
      const { user } = ctx.user
      if (user !== null) {
        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')

        const result = await UserModel.deleteUser(user._id)
        return result
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  },

  logIn: async function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): Promise<boolean> {
    const { res } = ctx
    try {
      const user = await UserModel.logIn({ email: args.input.email, pwd: args.input.pwd })

      res.clearCookie('refreshToken')
      res.clearCookie('accessToken')

      res.cookie('refreshToken', jwt.sign({ user }, JWT as string), { httpOnly: true, maxAge: 60 * 60 * 24 * 50 })
      res.cookie('accessToken', jwt.sign({ user }, JWT as string), { httpOnly: true, maxAge: 60 * 60 * 15 })

      return true
    } catch (e) {
      return false
    }
  },

  logOut: function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): boolean {
    const { res } = ctx
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')

    return true
  }

}

export default controller
