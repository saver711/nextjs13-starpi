import { NextAuthOptions } from "next-auth"
import googleProvider from "next-auth/providers/google"
import credentialsProvider from "next-auth/providers/credentials"
import { backendSignin } from "@/app/lib/api/auth/backend-signin"

export const authOptions: NextAuthOptions = {
  providers: [
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    credentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        identifier: {
          label: "Username / Email",
          type: "text",
          placeholder: "",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log(`authorize ~ credentials:`, credentials)
        if (credentials == null) return null
        try {
          const user = await backendSignin({
            identifier: credentials.identifier,
            password: credentials.password,
          })
          // console.log(`authorize ~ jwt:`, jwt)
          // console.log(`authorize ~ user:`, user)
          return user
        } catch (error) {
          // Sign In Fail
          return null
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user, account }) {
      console.log(`jwt ~ token:`, token)
      console.log(`jwt ~ user:`, user)
      // console.log(`jwt ~ account:`, account)
      const isSignIn = user ? true : false
      if (isSignIn && account) {
        try {
          if (account.provider === "credentials") {
            token.jwt = user.jwt
            token.id = user.id
            // token.name = user.username
          } else if (account.provider === "google") {
            // console.log("Google Account >>>>>>>>>>>>>> ", account)
            const public_url = process.env.NEXT_PUBLIC_API_URL
            const response = await fetch(
              `${public_url}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
            )
            const data = await response.json()
            console.log(`jwt ~ data:`, data)
            // console.log("Strapi Callback Data >>>>>>>>>>>>>> ", data)
            token.jwt = data.jwt
            token.id = data.user.id
            // token.name = user.name
          } 
        } catch (error) {
          console.error("Fetch failed:", error)
        }
      }
      return Promise.resolve({...token, ...user})
    },


    async session({ session, token }) {
      // console.log(`session ~ session:`, session)
      // console.log(`session ~ token:`, token)
      
      session.user = token.user || token as any
      //@ts-ignore
      session.user.name = token.name || token.user.username
      //@ts-ignore
      session.user.jwt = token.jwt 
      // Object.defineProperty(session.user, "id", {
      //   value: user ? user.id : null,
      // })
      // session.user?.id = user ? user.id : null
      return Promise.resolve(session)
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  /* pages 
  next auth comes with default pages, if i want to customize it i can do so like below, if i didn't specify some page it will fallback to the default one
  */
  // pages:{
  //   signIn:'/signin', //default is /api/auth/signin // custome page => https://medium.com/@tom555my/strapi-next-js-email-password-authentication-a8207f72b446
  // }
}
