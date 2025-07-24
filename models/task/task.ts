import TaskDBModel from '../../database/schemas/task'
import { Database } from '../../Errors/errors'

const model = {
  getTask: async function (id: string) {
    try {
      const Task = await TaskDBModel.find({ id_user: id })
      return Task
    } catch (e) {
      throw new Database('something went wrong')
    }
  },
  createTask: async function (id: string, title: string) {
    try {
      const newTask = await new TaskDBModel({ id_user: id, title })
      await newTask.save()

      return newTask
    } catch (e) {
      throw new Database('something went wrong')
    }
  },
  deleteTask: async function (id: string, title: string) {
    try {
      const deleteTask = await TaskDBModel.findOneAndDelete({ id_user: id, title })
      return deleteTask
    } catch (e) {
      throw new Database('something went wrong')
    }
  }
}

export default model
