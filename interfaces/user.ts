export interface User {
  id: string
  name?: string
  email: string
  pwd: string
}

export interface CreateUser {
  name?: string
  email: string
  pwd: string
}
