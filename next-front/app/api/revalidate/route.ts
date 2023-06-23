import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
  // const tag = request.nextUrl.searchParams.get('tag')
  // revalidateTag(tag)
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== process.env.ON_DEMAND_REVALIDATE_SECRET) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid secret token" }),
      {
        status: 401,
      }
    )
  }

  const path = request.nextUrl.searchParams.get("path") || "/"
  revalidatePath(path)

  return NextResponse.json({ revalidated: true })
}
