import { CreateUser, User } from '../../interfaces/user'
import UserDBModel from '../../database/schemas/user'

const model = {
  createUser: async function (args: CreateUser): Promise<User | boolean> {
    try {
      const newUser = new UserDBModel(args)
      return await newUser.save() as User
    } catch (e) {
      return false
    }
  }
}

export default model
