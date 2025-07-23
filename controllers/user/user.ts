import { Request, Response } from 'express'
import { User, CreateUser, ComfirmCreateUser } from '../../interfaces/user'
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

      const result = await UserModel.createUser(args.input)
      delete result.__v

      res.cookie('refreshToken', jwt.sign({ result }, JWT as string), { httpOnly: true, maxAge: 60 * 60 * 24 * 50 })
      res.cookie('accessToken', jwt.sign({ result }, JWT as string), { httpOnly: true, maxAge: 60 * 60 * 15 })

      return result
    } catch (e) {
      console.log(e)
      return null
    }
  },

  deleteUser: async function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): Promise<User | null> {
    const { req, res } = ctx
    try {
      const user = (jwt.verify(req.cookies.refreshToken, JWT as string) as { result: { name: string, email: string, pwd: string, _id: string, __v?: string } })

      delete user.result.__v

      res.clearCookie('refreshToken')
      res.clearCookie('accessToken')

      const result = await UserModel.deleteUser(user.result._id)
      return result
    } catch (e) {
      return null
    }
  }

}

export default controller
