// we needed it with qgl
//  "use client"
import { LoadImage } from "@/app/components/load-image"
import { fetchArticlesRest } from "@/app/lib/api/articles/fetch-articles-rest"
import { NEXT_PUBLIC_API_URL } from "@/app/lib/shared"
import { Metadata } from "next"
import { UpdateArticleForm } from "../components/update-article-form"

type ArticlePageProps = { params: { id: string } }

// حل مؤقت لمشكلة
// Dynamic server usage: headers
// export const dynamic = "force-static"

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
      {photos && (
        <div className="grid grid-cols-4 gap-3">
          {photos?.data?.map(
            ({ id, attributes: { url: src, alternativeText: alt } }) => (
              <div key={id}>
                <LoadImage alt={alt} src={NEXT_PUBLIC_API_URL + src} />
              </div>
            )
            )}
        </div>
      )}
      <h2 className="mt-4">Title: {title}</h2>
      <p>Description: {description}</p>
      <hr className="my-6" />
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
