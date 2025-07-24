export interface User {
  id: string
  name?: string
  email: string
  pwd: string
}

export interface CreateUser {
  input: { name?: string
    email: string
    pwd: string
    test?: string
  }
}

export interface CreateUserInput {
  name?: string
  email: string
  pwd: string
  test?: string
}

export interface ComfirmCreateUser {
  input: {
    name?: string
    email: string
    pwd: string
    code: number
  }
}

export interface UserAccessToken { user: { name: string, email: string, pwd: string, _id: string, __v?: string }}
