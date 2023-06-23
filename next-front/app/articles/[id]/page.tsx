// i needed it with qgl
//  "use client"
import LoadImage from "@/app/components/LoadImage"
import { fetchArticlesRest } from "@/app/lib/api/articles/fetch-articles-rest"
import { NEXT_PUBLIC_API_URL } from "@/app/lib/shared"
import { Metadata } from "next"
import { UpdateArticleForm } from "../components/update-article-form"

type ArticlePageProps = { params: { id: string } }

export const generateMetadata = async ({
  params: { id },
}: ArticlePageProps): Promise<Metadata> => {
  const {
    data: {
      attributes: { title },
    },
  }: ArticleRest = await fetchArticlesRest(+id)

  if (!title) {
    return { title: "Article couldn't be loaded" }
  }

  return {
    title,
  }
}

export const generateStaticParams = async () => {
  const { data }: ArticlesRest = await fetchArticlesRest()

  return data.map(({ id }) => ({ id: id.toString() }))
}

const ArticlePage = async ({ params: { id } }: ArticlePageProps) => {
  // const {
  //   data: {
  //     article: {
  //       data: {
  //         attributes: { description, title, photos },
  //       },
  //     },
  //   },
  // } = useGetArticles<Article>(+id)

  // REST
  const {
    data: {
      attributes: { description, photos, title },
    },
  }: ArticleRest = await fetchArticlesRest(+id)
  
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      {photos &&
        photos?.data?.map(
          ({ id, attributes: { url: src, alternativeText: alt } }) => (
            <LoadImage
              key={id}
              alt={alt || ""}
              src={NEXT_PUBLIC_API_URL + src}
              width={200}
              height={200}

            />
          )
        )}
      <UpdateArticleForm
        currentDescription={description}
        currentTitle={title}
        currentPhotos={photos.data}
        id={id}
      />
    </div>
  )
}

export default ArticlePage
