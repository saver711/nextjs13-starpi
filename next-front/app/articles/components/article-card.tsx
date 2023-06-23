import { NEXT_PUBLIC_API_URL } from "@/app/lib/shared"
import Image from "next/image"
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
    <Link href={`/articles/${id}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      {src && <Image alt={alt} src={src} width={200} height={200} style={{height: "auto", width: "auto"}} />}
    </Link>
  )
}
