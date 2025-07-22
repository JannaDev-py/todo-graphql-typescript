import { IResolvers } from '@graphql-tools/utils'
import UserController from '../../controllers/user/user'

const resolvers: IResolvers = {
  Query: {
    codeEmail: UserController.codeEmail,
    verifyCode: UserController.verifyCode
  },
  Mutation: {
    createUser: UserController.createUser,
    deleteUser: UserController.deleteUser
  }
}

export default resolvers
