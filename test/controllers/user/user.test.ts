import request from 'supertest'
import { createApp } from '../../../app'
import dotenv from 'dotenv'
import { Express } from 'express'
import mongoose from 'mongoose'

dotenv.config({ quiet: true })

const { TEST_MASTER_PWD } = process.env
let app: Express

beforeAll(async () => {
  app = await createApp()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('Controller-User', () => {
  let agent: any

  beforeAll(() => {
    agent = request.agent(app)
  })

  test('codeEmail', async () => {
    const query = `#graphql
      query ExampleQuery($input: CreateUser!) {
        codeEmail(input: $input)
      }
    `
    const variables = {
      input: {
        email: 'floo234.clashroyale@gmail.com',
        name: 'test',
        pwd: '123',
        test: TEST_MASTER_PWD as string
      }
    }

    const response = await agent
      .post('/graphql')
      .send({ query, variables })

    expect(response.body.data.codeEmail).toBe(true)

    const cookie = response.headers['set-cookie']
    expect(cookie?.[0]).toMatch(/^verifyEmail=/)
  })

  test('verifyEmail', async () => {
    const query = `#graphql
      query ExampleQuery($input: ConfirmCreateUser!) {
        verifyCode(input: $input)
      }
    `
    const variables = {
      input: {
        email: 'floo234.clashroyale@gmail.com',
        name: 'test',
        pwd: '123',
        code: 1234
      }
    }

    const response = await agent
      .post('/graphql')
      .send({ query, variables })

    expect(response.body.data.verifyCode).toBe(true)

    const cookie = response.headers['set-cookie']
    expect(cookie?.[1]).toMatch(/^EmailVerified=/)
    expect(cookie?.includes('verifyEmail')).toBe(false)
  })
})
