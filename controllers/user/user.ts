import { Request, Response } from 'supertest'
import { User, CreateUser } from '../../interfaces/user'

const controller = {
  codeEmail: function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): boolean {
    return true
  },

  verifyCode: function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): boolean {
    return true
  },

  createUser: function (root: any, args: CreateUser, ctx: { req: Request, res: Response }): User {
    return { id: '', name: '', email: '', pwd: '' }
  }

}
export default controller
