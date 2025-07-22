function createError (name: string): any {
  return class extends Error {
    constructor (message: string) {
      super(message)
      this.name = name
    }
  }
}

export const DuplicateEntry = createError('duplicateEntry')
export const Database = createError('database error')
