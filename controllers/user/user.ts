import { Request, Response } from 'express'
import { User, CreateUser } from '../../interfaces/user'
import { sendEmail, verifyEmail, generateCode } from '../../utils/utils'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const controller = {
  codeEmail: async function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): Promise<boolean> {
    const { res } = ctx
    if (verifyEmail(args.email)) {
      const code = generateCode()
      const hashInfo = jwt.sign({ email: args.email, code }, process.env.JWT as string)

      await sendEmail(args.email, code)

      res.cookie('verifyEmail', hashInfo, {
        httpOnly: true
      })

      return true
    }
    return false
  },

  verifyCode: function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): boolean {
    return true
  },

  createUser: function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): User {
    return { id: '', name: '', email: '', pwd: '' }
  }

}

export default controller
