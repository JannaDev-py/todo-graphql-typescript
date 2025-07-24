// Sources
import typeDefs from './schemas/merge'
import resolvers from './resolvers/merge'

// Framwork/libraries
import { ApolloServer } from '@apollo/server'
import express from 'express'
import { expressMiddleware } from '@as-integrations/express5'

// Middlewares
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

dotenv.config({ quiet: true })
const { MONGODB_URL, JWT } = process.env

export async function createApp (): Promise<express.Express> {
  const app = express()

  await mongoose.connect(MONGODB_URL as string)
    .catch(e => console.error('error connection to database'))

  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  app.use(
    '/graphql',
    express.json(),
    cookieParser(),

    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const accessToken = req.cookies.accessToken

        if (accessToken !== null) {
          try {
            const user = jwt.verify(accessToken, JWT as string)
            return { req, res, user }
          } catch (e) {
            return { req, res, user: null }
          }
        }

        return { req, res, user: null }
      }
    })
  )

  return app
}
