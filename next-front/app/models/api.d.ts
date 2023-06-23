type ResponseError = {
  response: {
    data: {
      error: {
        details: {
          errors: {
            message: string
            path: string[]
          }[]
        }
      }
    }
  }
}
type MutationError = {
  graphQLErrors: {
    message: string
    extensions: {
      error: {
        message: string
        details: {
          errors: {
            path: string[]
            message: string
          }[]
        }
      }
    }
  }[]
}

type ApiPhoto = {
  id: string
  attributes: {
    name: string
    alternativeText?: string
    url: string
  }
}


type GoogleUser = {
  user: User
  expires: Date
}

type User = {
  name: string
  email: string
  image: string
}
