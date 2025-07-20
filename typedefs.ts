const typedefs = `#graphql
  type User {
    id: ID!
    name: String
    email: String!
    pwd: String!
  }
  
  input CreateUser {
    name: String
    email: String!
    pwd: String!
  }

  type Query {
    codeEmail(input: CreateUser): Boolean!
    verifyCode(input: CreateUser): Boolean!
  }

  type Mutation {
    createUser(data: CreateUser): User!
  }
`

export default typedefs
