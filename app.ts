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

async function start (): Promise<void> {
  await mongoose.connect(process.env.MONGODB_URL as string)
    .then(async () => {
      const app = express()

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

      app.listen(4000, () => console.log('server at port 4000'))
    })
    .catch(e => console.error('error connection to database'))
}

start()
  .catch(e => {
    console.error(e)
  })
