import UserModel from '../../../models/user/user'
import UserDBModel from '../../../database/schemas/user'
import mongoose from 'mongoose'

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/testDB')
  await UserDBModel.findOneAndDelete({ email: 'test' })
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('model-user', () => {
  test('create user fn', async () => {
    const response = await UserModel.createUser({ name: 'test', email: 'test', pwd: 'test' })

    expect(response).toEqual(
      expect.objectContaining({
        _id: expect.anything(),
        name: 'test',
        email: 'test',
        pwd: 'test'
      })
    )
  })
})
