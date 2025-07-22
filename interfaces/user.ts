export interface User {
  id: string
  name?: string
  email: string
  pwd: string
}

export interface CreateUser {
  input: {
    name?: string
    email: string
    pwd: string
    test?: string
  }
}

export interface ComfirmCreateUser {
  input: {
    name?: string
    email: string
    pwd: string
    code: number
  }
}
