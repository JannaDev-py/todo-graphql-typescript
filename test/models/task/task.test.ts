import { User } from '../../../interfaces/user'
import Taskmodel from '../../../models/task/task'
import UserModel from '../../../models/user/user'
import mongoose from 'mongoose'

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/testDB')
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Task-model', () => {
  let user: User
  beforeAll(async () => {
    user = await UserModel.createUser({ email: 'test', pwd: 'test' })
  })

  test('createTask', async () => {
    const response = await Taskmodel.createTask(user.id, 'test')

    expect(response).toEqual(
      expect.objectContaining({
        _id: expect.anything(),
        title: 'test',
        id_user: user.id
      })
    )
  })

  test('getTask', async () => {
    const response = await Taskmodel.getTask(user.id)

    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.anything(),
          title: 'test',
          id_user: user.id
        })
      ])
    )
  })

  test('deleteTask', async () => {
    const response = await Taskmodel.deleteTask(user.id, 'test')

    expect(response).toEqual(
      expect.objectContaining({
        _id: expect.anything(),
        title: 'test',
        id_user: user.id
      })
    )
  })
})
