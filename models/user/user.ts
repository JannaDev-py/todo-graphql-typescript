import { CreateUser, User } from '../../interfaces/user'
import UserDBModel from '../../database/schemas/user'
import { DuplicateEntry, Database } from '../../Errors/errors'

const model = {
  createUser: async function (args: CreateUser): Promise<User | typeof DuplicateEntry | typeof Database> {
    try {
      const guard = await UserDBModel.findOne({ email: args.email })

      if (guard !== null) {
        throw new DuplicateEntry('email in use')
      }

      const newUser = new UserDBModel(args)
      return await newUser.save() as User
    } catch (e) {
      throw new Database('database error')
    }
  }
}

export default model
