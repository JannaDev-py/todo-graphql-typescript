import { CreateUser, User } from '../../interfaces/user'
import UserDBModel from '../../database/schemas/user'
import { DuplicateEntry, Database } from '../../Errors/errors'

const model = {
  createUser: async function (args: CreateUser): Promise<User | typeof DuplicateEntry | typeof Database> {
    try {
      const newUser = new UserDBModel(args)
      return await newUser.save() as User
    } catch (e) {
      if ((e as any).code === 11000 && (e as Error).message.includes('email')) {
        throw new DuplicateEntry('email in use')
      }

      throw new Database('database error')
    }
  },
  deleteUsere: async function (id: String): Promise<User | typeof Database> {
    try {
      const deleteUser = await UserDBModel.findByIdAndDelete(id)
      return deleteUser
    } catch (e) {
      throw new Database('database error')
    }
  }
}

export default model
