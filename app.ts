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

dotenv.config({ quiet: true })

export async function createApp (): Promise<express.Express> {
  const app = express()

  await mongoose.connect(process.env.MONGODB_URL as string)
    .catch(e => console.error('error connection to database'))

  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  app.use(
    '/graphql',
    express.json(),
    cookieParser(),

    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, res }
      }
    })
  )

  return app
}
