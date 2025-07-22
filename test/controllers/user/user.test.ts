import request from 'supertest'
import { createApp } from '../../../app'
import dotenv from 'dotenv'
import { Express } from 'express'

dotenv.config({ quiet: true })

const { TEST_MASTER_PWD } = process.env
let app: Express

beforeAll(async () => {
  app = await createApp()
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
})
