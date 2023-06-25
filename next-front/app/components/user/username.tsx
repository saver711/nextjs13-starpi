"use client"
import { useSession } from "next-auth/react"

export const Username = ()=> {
    const {data, status} = useSession()
    console.log(`Username ~ data:`, data)

    return status === "authenticated" ? <h4>{data.user?.name}</h4>  : null
}