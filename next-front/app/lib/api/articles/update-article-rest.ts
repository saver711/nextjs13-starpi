import { getSession } from "next-auth/react"
import { NEXT_PUBLIC_API_URL } from "../../shared"

export const updateArticleRest = async(values: FormData, id:string) => {
    const session = await getSession()

  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/articles/${id}`, {
    body: values,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session?.user?.jwt}`,
    },
  })

  if (!res.ok) return undefined

  return res.json()
}
