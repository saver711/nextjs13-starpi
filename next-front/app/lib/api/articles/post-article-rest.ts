import { getSession } from "next-auth/react"
import { NEXT_PUBLIC_API_URL } from "../../shared"

export const postArticleRest = async (values: FormData) => {
  const session = await getSession()
  const res = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/articles?populate=photos`,
    {
      body: values,
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user?.jwt}`,
      },
    }
  )
  if (!res.ok) return undefined

  return res.json()
}
