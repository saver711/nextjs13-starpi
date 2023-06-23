import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation"

export async function GET(){
  // ممكن استخدم دي عادي في اي سيرفر كمبوننت
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "You need to login first!" })

    // to protect component
    // redirect("/api/auth/signin")
  }

  return NextResponse.json({ message: `HELLO! ${session.user?.name}` })
}