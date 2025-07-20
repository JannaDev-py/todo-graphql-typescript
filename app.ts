// Sources
import typeDefs from './schemas/user/typedefs'
import resolvers from './resolvers/merge'

// Framwork/libraries
import { ApolloServer } from '@apollo/server'
import express from 'express'
import { expressMiddleware } from '@as-integrations/express5'

// Middlewares
import cookieParser from 'cookie-parser'

async function start (): Promise<void> {
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
}

start()
  .catch(e => {
    console.error(e)
  })
