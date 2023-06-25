"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export const LogButton = () => {
  const { status } = useSession()

  switch (status) {
    case "authenticated":
      return <button onClick={() => signOut()}>Logout</button>
    case "unauthenticated":
      return (
        <div className="flex items-center">
          <Link href="/register" className="me-2">Register</Link>
          <button onClick={() => signIn()}>login</button>
        </div>
      )
    case "loading":
      return <h5>Loading...</h5>
    default:
      return <h5>Something is wrong with authentication</h5>
  }
}
