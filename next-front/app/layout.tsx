import { ApolloWrapper } from "@/app/lib/apollo-wrapper"
import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "./components/providers/auth-provider"
import { AppLoading } from "./components/utils/app-loading"

// export const dynamic = "force-dynamic"

const inter = Inter({ subsets: ["latin"], fallback: ["serif"] })
export const metadata = {
  title: "Next - apollo",
  description: "Generated by create next app",
}

export const revalidate = 86400

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppLoading />
          {/* TO USE GRAPHQL, although it is not a good option with nextjs */}
          {/* <ApolloWrapper> */}
          {children}
          {/* </ApolloWrapper> */}
        </AuthProvider>
      </body>
    </html>
  )
}
