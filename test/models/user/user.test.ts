import UserModel from '../../../models/user/user'
import mongoose from 'mongoose'
import { DuplicateEntry, NotFound } from '../../../Errors/errors'

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/testDB')
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('model-user', () => {
  let id: String
  test('create user fn', async () => {
    const response = await UserModel.createUser({ name: 'test', email: 'test', pwd: 'test' })
    id = response._id
    expect(response).toEqual(
      expect.objectContaining({
        _id: expect.anything(),
        name: 'test',
        email: 'test',
        pwd: expect.any(String)
      })
    )
  })

  test('duplicate entry creating user', async () => {
    await expect(UserModel.createUser({ name: 'test', email: 'test', pwd: 'test' }))
      .rejects.toThrow(new DuplicateEntry('email in use'))
  })

  test('logIn', async () => {
    const response = await UserModel.logIn({ email: 'test', pwd: 'test' })

    expect(response).toEqual(
      expect.objectContaining({
        _id: expect.anything(),
        name: 'test',
        email: 'test',
        pwd: expect.any(String)
      })
    )
  })

  test('delete user', async () => {
    const response = await UserModel.deleteUser(id)

    expect(response).toEqual(
      expect.objectContaining({
        _id: expect.anything(),
        name: 'test',
        email: 'test',
        pwd: expect.any(String)
      })
    )

    await expect(UserModel.deleteUser(id)).rejects.toThrow(new NotFound('User dont exist'))
  })
})
