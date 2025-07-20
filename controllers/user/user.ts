import { Request, Response } from 'supertest'
import { User, CreateUser } from '../../interfaces/user'

function codeEmail (root: any, args: CreateUser, ctx: { req: Request, res: Response }): boolean {
  return true
}

function verifyCode (root: any, args: CreateUser, ctx: { req: Request, res: Response }): boolean {
  return true
}

function createUser (root: any, args: CreateUser, ctx: { req: Request, res: Response }): User {
  return { id: '', name: '', email: '', pwd: '' }
}

export default { codeEmail, verifyCode, createUser }
