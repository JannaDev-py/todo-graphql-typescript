
# TODO-GRAPHQL-TYPESCRIPT

## 📚 Learn GraphQL

This repository offers a structured template to help developers understand how to build robust GraphQL applications with Node.js. I created it after noticing that most tutorials and repositories I found were either deprecated or incomplete — even recent ones.

Whether you're practicing or trying to verify if you're on the right track, this project aims to showcase the essential components of building a GraphQL backend with modern tooling and good architecture.


## Tech Stack

Node, Express, Apollo sever, GraphQL, mongodb 


## Installation

Install my-project with npm

```bash
  pnpm install
```

### Available commands
```bash
  pnpm run test
  pnpm run dev
```
## 🔍 API Overview

### 🧵 Queries

- `getTask`: Get all tasks for the authenticated user
- `codeEmail(input)`: Start email verification flow
- `verifyCode(input)`: Confirm code and set verified email cookie
- `logIn(input)`: Login user
- `logOut`: Logout user

### 🪄 Mutations

- `createUser(input)`: Create user (requires verified email cookie)
- `deleteUser`: Delete current user
- `createTask(input)`: Add new task
- `deleteTask(input)`: Remove task by title
## 📁 Project Structure

```bash
jannadev-py-todo-graphql-typescript/
├── app.ts
├── server.ts
├── schemas/             # GraphQL typedefs
├── resolvers/           # Modular resolvers with merge strategy
├── controllers/         # Request logic
├── models/              # DB interactions
├── database/            # Mongoose schemas
├── interfaces/          # TypeScript types
├── utils/               # Email, code generation, validators
├── Errors/              # Custom error classes
├── test/                # Controllers & models unit tests
```

## Running Tests

Test cover all cases where everything goes well, but most of the cases when dont goes everything very well xd

```bash
  pnpm run test
```

## ⚙️ Environment Variables

Create a `.env` file at the root of the project with the following variables:

```dotenv
MONGODB_URL=''        # Connection URL for your MongoDB database
EMAIL=''              # Email address used to send verification codes
EMAIL_PWD=''          # Password for the email account (preferably an app password)
JWT=''                # Secret key for signing JWT tokens

TEST_MASTER_PWD=''    # Master password for user testing
SALT=''               # Salt used for hashing passwords or tokens
```

## 🚀 Future Work
If you're interested in contributing, feel free to add new features — especially those that expand the app or improve its GraphQL usage. Contributions that focus on:

- Enhancing GraphQL modularity and schema design
- Improving authentication and authorization workflows
- Refining resolver patterns for scalability
- Exploring better testing strategies for GraphQL operations
- Introducing new use cases or queries/mutations with clear purpose

...are more than welcome! The goal is to make the app not just more functional, but a reference for clean and efficient GraphQL integration.

> 🛠️ Please prioritize contributions that demonstrate best practices for GraphQL usage, so the project continues to be a helpful learning resource for others.
