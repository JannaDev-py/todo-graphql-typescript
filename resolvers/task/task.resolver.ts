import { IResolvers } from '@graphql-tools/utils'
import TaskController from '../../controllers/task/task'

const resolvers: IResolvers = {
  Query: {
    getTask: TaskController.getTask
  },
  Mutation: {
    createTask: TaskController.createTask,
    deleteTask: TaskController.deleteTask
  }
}

export default resolvers
