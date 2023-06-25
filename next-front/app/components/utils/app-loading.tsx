"use client"
import { useSession } from "next-auth/react"

export const AppLoading = () => {
  const { status } = useSession()
  return status === 'loading' ? <div className="fixed top-0 start-0 w-full h-full bg-slate-950 flex justify-center items-center z-50">LOADING....</div> : null
}
