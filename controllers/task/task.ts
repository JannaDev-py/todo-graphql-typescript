import { TaskInput } from '../../interfaces/task'
import { UserAccessToken } from '../../interfaces/user'
import TaskModel from '../../models/task/task'

const controller = {
  getTask: async function (root: any, args: any, ctx: { req: Request, res: Response, user: UserAccessToken }) {
    const { user } = ctx.user
    try {
      if (user !== null) {
        const task = await TaskModel.getTask(user._id)
        return task
      }
      return null
    } catch (e) {
      return null
    }
  },
  createTask: function (root: any, args: TaskInput, ctx: { req: Request, res: Response }) {

  },
  deleteTask: function (root: any, args: TaskInput, ctx: { req: Request, res: Response }) {

  }
}

export default controller
