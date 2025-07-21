import { User } from '../../interfaces/user'
import { Connection } from 'mongoose'

const model = {
  createUser: async function (args: User, connection: Connection): Promise<boolean> {
    return true
  }
}

export default model
