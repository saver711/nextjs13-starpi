"use client"
import { signIn, useSession } from "next-auth/react"
import { ChangeEvent, useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL_WITH_API } from "../lib/shared"
import { useRouter } from "next/navigation"
export default function RegisterPage() {
  const { status } = useSession()
  const router = useRouter()
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    if (status === "authenticated") {
      return router.replace("/")
    } else if (status === "unauthenticated") {
      setFirstRender(false)
    }
  }, [status, router])
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setFormValues({ username: "", email: "", password: "" })

    const res = await fetch(
      `${NEXT_PUBLIC_API_URL_WITH_API}/auth/local/register`,
      {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    setLoading(false)
    if (!res.ok) {
        const response = await res.json()
        console.log(`onSubmit ~ response:`, response)
        setError(response.error.message)
        return
    }
    
    await signIn("credentials", {
      redirect: true,
      identifier: formValues.email,
      password: formValues.password,
      callbackUrl: "/",
    })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

  return firstRender ? (
    <h5>LOADING...</h5>
  ) : (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="mb-6">
        <input
          required
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          placeholder="Username"
          className={`${input_style}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
          className={`${input_style}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className={`${input_style}`}
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "loading..." : "Sign Up"}
      </button>
    </form>
  )
}
