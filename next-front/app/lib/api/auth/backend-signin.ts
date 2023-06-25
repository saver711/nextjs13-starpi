import { NEXT_PUBLIC_API_URL_WITH_API } from "../../shared"

export const backendSignin = async ({
  identifier,
  password,
}: {
  identifier: string
  password: string
}) => {
  const formData = new FormData()
  formData.append("identifier", identifier)
  formData.append("password", password)
  const res = await fetch(`${NEXT_PUBLIC_API_URL_WITH_API}/auth/local`, {
    body: formData,
    method: "POST",
  })
  if(!res.ok) return null
  const jsonResponse = res.json()
  return jsonResponse
}
