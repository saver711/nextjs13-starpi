import { LoadImage } from "@/app/components/load-image"
import { NEXT_PUBLIC_API_URL } from "@/app/lib/shared"
import Link from "next/link"

type ArticleCardProps = {
  title: string
  description: string
  photo: ApiPhoto | null
  id: number
}

export const ArticleCard = ({
  title,
  description,
  photo,
  id
}: ArticleCardProps) => {
  const src = photo ? NEXT_PUBLIC_API_URL + photo.attributes.url : undefined
  const alt = photo?.attributes.alternativeText || "next-front"

  return (
    <Link
      href={`/articles/${id}`}
      className="p-8 bg-slate-600 rounded-md hover:bg-slate-500"
    >
      {src && (
        <div className="mb-3">
          <LoadImage src={src} alt={alt} />
        </div>
      )}
      <h2>Title: {title}</h2>
      <p>Description: {description}</p>
    </Link>
  )
}
