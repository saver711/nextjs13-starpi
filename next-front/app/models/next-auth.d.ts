import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires?: Date,
    user?: {
      name: string
      email: string
      picture?: string
      jwt: string
      //   sub: string
      id: string
    //   iat: number
    //   exp: number
    //   jti: string
    }
  }

  interface User extends DefaultUser {
    jwt?:string
  }

  interface AdapterUser extends User {
    id: string
    email: string
    emailVerified: Date | null
    jwt?:string
  }
}
