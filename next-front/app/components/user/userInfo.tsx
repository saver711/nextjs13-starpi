"use client"

import { useSession } from "next-auth/react"

export const UserInfo = ()=>{
    const {data, status, update} = useSession()
    return <h4>{data?.user?.name}</h4>
}