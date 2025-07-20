import { IResolvers } from '@graphql-tools/utils'

const resolvers: IResolvers = {
  Query: {
    codeEmail: () => {
      console.log('ask for a email code')
      return true
    },
    verifyCode: (_, args, { req, res }) => {
      console.log('verify code')
      return true
    }
  },
  Mutation: {
    createUser: () => {
      console.log('createUser')
    }
  }
}

export default resolvers
