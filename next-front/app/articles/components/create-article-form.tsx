"use client"

// import { usePostArticleGraph } from "@/app/hooks/use-post-article-graph"
import { redirect, usePathname, useRouter } from "next/navigation"

import { postArticleRest } from "@/app/lib/api/articles/post-article-rest"
import { FormEvent, useState, useTransition } from "react"
import { useSession } from "next-auth/react"

export const CreateArticleForm = () => {
  // const {data, status, update} = useSession({
  //   // protected
  //   required: true,
  //   onUnauthenticated(){
  //   //   // إرجع هنا تاني بعد ما ت signin
  //   //   // المفروض دا الديفولت بيهافيور بس لسه مش شغال مع الابب ديريكتوري
  //     redirect("/api/auth/signin?callbackUrl=/articles/create")
  //   }
  // })
  // console.log(`CreateArticleForm ~ data:`, data)
  const router = useRouter()
  const pathname = usePathname()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [photos, setPhotos] = useState<FileList | null>(null)

  const [isPending, startTransition] = useTransition()
    const [isFetching, setIsFetching] = useState(false)
    const isMutating = isFetching || isPending

  const values = { title, description }

  const afterSuccessHandler = ()=>{

    startTransition(() => {
      if (pathname === "/articles/create") {
        router.push("/articles")
        router.refresh()
      } else {
        // Refresh the current route and fetch new data
        // from the server without losing
        // client-side browser or React state.
        router.refresh()
      }
    })
    setIsFetching(false)
  }

  // const [sendWithGraph, { called, data, loading, error: comingError }] =
  //   usePostArticleGraph()
  // const error = comingError as unknown as MutationError

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsFetching(true)
    e.preventDefault()
    if (!title || !description) {
      alert("title or description missing")
      return
    }
    const formData = new FormData()
    formData.append("data", JSON.stringify(values))
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        formData.append(`files.photos`, photos[i])
      }
      const data = await postArticleRest(formData)
      if(data){
        afterSuccessHandler()
      }
      setIsFetching(false)
    } else {
      // sendWithGraph({
      //   variables: {
      //     title,
      //     description,
      //   },
      // })
      const data= await postArticleRest(formData)
      if (data) {
        afterSuccessHandler()
      }
      setIsFetching(false)
    }
    
  }
  return (
    <form onSubmit={submitHandler}>
      <h2>Create article form</h2>

      <input
        placeholder="title"
        type="text"
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
      />
      <textarea
        placeholder="description"
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
      />

      {!!photos?.length && <p>{photos?.length} Photos</p>}
      <input
        type="file"
        multiple
        onChange={({ target: { files } }) => setPhotos(files)}
      />

      <input
        disabled={isMutating}
        type="submit"
        value={isMutating ? `LOADING...` : `SUBMIT`}
        // disabled={loading}
        className="disabled:cursor-not-allowed"
      />
      {/* {loading && "Sending"} */}
      <br />
      {/* {error && error.graphQLErrors.map((err) => err.extensions.error.message)} */}
    </form>
  )
}
