"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export const LogButton = () => {
  const { data, status, update } = useSession()
  return status === "authenticated" ? (
    <button onClick={() => signOut()}>Logout</button>
  ) : status === "loading" ? (
    "Loading..."
  ) : (
    <button onClick={() => signIn()}>login</button>
  )
}
