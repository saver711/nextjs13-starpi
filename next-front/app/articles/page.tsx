import { Suspense } from "react"
import Link from "next/link"
import { fetchArticlesRest } from "../lib/api/articles/fetch-articles-rest"
import { ArticleCard } from "./components/article-card"



const ArticlesPage = async() => {
  // const {
  //   data: {
  //     articles: { data },
  //   },
  //   error,
  // } = useGetArticles<Articles>()
  // const articles = data

  // REST
  const articlesData: Promise<ArticlesRest> = fetchArticlesRest()
  const { data: articles } = await articlesData

  return (
    <>
      <Link href="/articles/create">Create article</Link>
      <Suspense fallback={<h2>Loading...</h2>}>
        {articles.map(({ id, attributes: { title, description, photos } }) => (
          <ArticleCard
            key={id}
            {...{
              title,
              description,
              photo: photos.data && photos.data[0],
              id,
            }}
          />
        ))}
      </Suspense>
    </>
  )
}
export default ArticlesPage
