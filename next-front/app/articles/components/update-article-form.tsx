"use client"

import { updateArticleRest } from "@/app/lib/api/articles/update-article-rest"
import { NEXT_PUBLIC_API_URL } from "@/app/lib/shared"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState, useTransition } from "react"
import { AiFillDelete } from "react-icons/ai"

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
    // try catch here or better implementation, but it is not my main goal here
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
        <>
          <button
            className="rounded bg-red-600 px-6 py-3 inline-block"
            onClick={() => setEditMode((current) => !current)}
          >
            CANCEL
          </button>
          <form onSubmit={submitHandler}>
            <h2 className="my-3">Update {currentTitle}</h2>
            <input
              placeholder="title"
              type="text"
              value={title}
              onChange={({ target: { value } }) => setTitle(value)}
            />
            <textarea
              className="block my-4"
              placeholder="description"
              value={description}
              onChange={({ target: { value } }) => setDescription(value)}
            />

            <div className="grid grid-cols-4 gap-3">
              {oldPhotos?.map(
                ({
                  id,
                  attributes: { url, alternativeText: alt, width, height },
                }) => (
                  <div key={id} className="relative">
                    <Image
                      alt={alt || ""}
                      src={NEXT_PUBLIC_API_URL + url}
                      {...{ width, height }}
                    />
                    <button
                      onClick={() =>
                        setOldPhotos((current) =>
                          current?.filter((photo) => photo.id !== id)
                        )
                      }
                    >
                      <AiFillDelete
                        color="red"
                        className="absolute top-3 end-3"
                      />
                    </button>
                  </div>
                )
              )}
            </div>

            <hr />
            <h3 className="my-3">Add extra photos</h3>
            {!!photos?.length && (
              <p className="ms-3">{photos?.length} Photos</p>
            )}
            <input
              type="file"
              multiple
              onChange={({ target: { files } }) => setPhotos(files)}
            />

            <br />
            <input
              disabled={isMutating}
              type="submit"
              value={isMutating ? `LOADING...` : `SUBMIT`}
              className="disabled:cursor-not-allowed rounded cursor-pointer mt-4 bg-slate-600 px-6 py-3 inline-block"
            />
            <br />
            {/* {error && error.graphQLErrors.map((err) => err.extensions.error.message)} */}
          </form>
        </>
      ) : (
        <button
          className="rounded bg-slate-500 px-6 py-3 inline-block"
          onClick={() => setEditMode((current) => !current)}
        >
          EDIT
        </button>
      )}
    </>
  )
}
