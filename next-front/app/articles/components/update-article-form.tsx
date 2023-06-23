"use client"

import LoadImage from "@/app/components/LoadImage"
// import { usePostArticleGraph } from "@/app/hooks/use-post-article-graph"
import { updateArticleRest } from "@/app/lib/api/articles/update-article-rest"
import { NEXT_PUBLIC_API_URL } from "@/app/lib/shared"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState, useTransition } from "react"

type UpdateArticleFormProps = {
  currentTitle: string
  id: string
  currentDescription: string
  currentPhotos: ApiPhoto[] | null
}
export const UpdateArticleForm = ({
  currentDescription,
  currentPhotos,
  currentTitle,
  id,
}: UpdateArticleFormProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isPending || isFetching

  const [editMode, setEditMode] = useState(false)

  const [title, setTitle] = useState(currentTitle)
  const [description, setDescription] = useState(currentDescription)

  const [oldPhotos, setOldPhotos] = useState<ApiPhoto[] | null | undefined>(
    currentPhotos
  )
  const oldPhotosIds = oldPhotos?.map(({ id }) => id) || []

  const [photos, setPhotos] = useState<FileList | null>(null)

  const values = { title, description }

  useEffect(() => {
    setOldPhotos(currentPhotos)
    setTitle(currentTitle)
    setDescription(currentDescription)
  }, [currentPhotos, currentTitle, editMode, currentDescription])

  // const [sendWithGraph, { called, data, loading, error: comingError }] =
  //   usePostArticleGraph()
  // const error = comingError as unknown as MutationError

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description) {
      alert("title or description missing")
      return
    }

    setIsFetching(true)
    const formData = new FormData()
    formData.append("data", JSON.stringify({ ...values, photos: oldPhotosIds }))
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        formData.append(`files.photos`, photos[i])
      }
      const data = await updateArticleRest(formData, id)

      if (data) {
        afterSuccessHandler()
      }
    } else {
      // Maybe update with graphql
      // ......
      const data = await updateArticleRest(formData, id)

      if (data) {
        afterSuccessHandler()
      }
    }

    setIsFetching(false)
  }

  function afterSuccessHandler() {
    startTransition(() => router.refresh())
    setEditMode(false)
    setPhotos(null)
  }
  return (
    <>
      {editMode ? (
        <form onSubmit={submitHandler}>
          <h2>Update {currentTitle}</h2>
          <button onClick={() => setEditMode((current) => !current)}>
            CANCEL
          </button>
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

          {oldPhotos?.map(
            ({ id, attributes: { url: src, alternativeText: alt } }) => (
              <div key={id}>
                <LoadImage
                  alt={alt || ""}
                  src={NEXT_PUBLIC_API_URL + src}
                  width={200}
                  height={200}
                />
                <span
                  onClick={() =>
                    setOldPhotos((current) =>
                      current?.filter((photo) => photo.id !== id)
                    )
                  }
                >
                  DELETE
                </span>
              </div>
            )
          )}

          <hr />
          <h3>Add new photos</h3>
          <input
            type="file"
            multiple
            onChange={({ target: { files } }) => setPhotos(files)}
          />

          {!!photos?.length && <p>{photos?.length} Photos</p>}

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
      ) : (
        <button onClick={() => setEditMode((current) => !current)}>EDIT</button>
      )}
    </>
  )
}
