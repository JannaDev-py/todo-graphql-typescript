import { Request, Response } from 'express'
import { User, CreateUser, ComfirmCreateUser } from '../../interfaces/user'
import { sendEmail, verifyEmail, generateCode } from '../../utils/utils'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })
const { JWT } = process.env

const controller = {
  codeEmail: async function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): Promise<boolean> {
    const { res } = ctx
    const { email } = args.input

    if (verifyEmail(email)) {
      const code = generateCode()
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
      const cookieInfo = jwt.verify(req.cookies.verifyEmail, JWT as string)

      res.cookie('EmailVerified', jwt.sign({ verified: true }, JWT as string), {
        httpOnly: true
      })

      if (args.input.code === (cookieInfo as CookieInfo).code &&
      args.input.email === (cookieInfo as CookieInfo).email) {
        return true
      }
    } catch (err) {
      return false
    }
    return true
  },

  createUser: function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): User {
    return { id: '', name: '', email: '', pwd: '' }
  },

  deleteUser: function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): User {
    return { id: '', name: '', email: '', pwd: '' }
  }

}

export default controller
