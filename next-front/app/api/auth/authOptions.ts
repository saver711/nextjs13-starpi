import { AuthOptions, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async session({ user, session, token }) {
      session.user = token as any
      Object.defineProperty(session.user, "id", {
        value: user ? user.id : null
      })
      // session.user?.id = user ? user.id : null
      return Promise.resolve(session)
    },

    async jwt({ token, user, account }) {
      const isSignIn = user ? true : false
      if (isSignIn && account) {
        try {
          // console.log("Google Account >>>>>>>>>>>>>> ", account)
          const public_url = process.env.NEXT_PUBLIC_API_URL
          const response = await fetch(
            `${public_url}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
          )
          const data = await response.json()
          // console.log("Strapi Callback Data >>>>>>>>>>>>>> ", data)
          token.jwt = data.jwt
          token.id = data.user.id
        } catch (error) {
          console.error("Fetch failed:", error)
        }
      }
      return Promise.resolve(token)
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  /* pages 
  next auth comes with default pages, if i want to customize it i can do so like below, if i didn't specify some page it will fallback to the default one
  */
  // pages:{
  //   signIn:'/signin', //default is /api/auth/signin
  // }
}