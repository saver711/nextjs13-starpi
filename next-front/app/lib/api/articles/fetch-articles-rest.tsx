import { NEXT_PUBLIC_API_URL_WITH_API } from "../../shared"

export const fetchArticlesRest = async (id?: number) => {
  const res = await fetch(
    `${NEXT_PUBLIC_API_URL_WITH_API}/articles${id ? `/${id}` : ""}?populate=photos`
  )

  return res.json()
}
