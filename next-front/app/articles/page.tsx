import { Suspense } from "react"
import Link from "next/link"
import { fetchArticlesRest } from "../lib/api/articles/fetch-articles-rest"
import { ArticleCard } from "./components/article-card"
import { BsPen } from "react-icons/bs"

const ArticlesPage = async () => {
  // GQL
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
      <Link
        className="fixed rounded-full end-5 bottom-5 bg-slate-700 p-1 w-14 h-14 flex justify-center items-center"
        href="/articles/create"
      >
        <BsPen size={20} />
      </Link>
      {articles.length === 0 && <h3>No articles here, <Link className="text-slate-400" href="/articles/create">Write one</Link></h3>}
      <Suspense fallback={<h2>Loading...</h2>}>
        <div className="grid grid-cols-3 gap-6">
          {articles.map(
            ({ id, attributes: { title, description, photos } }) => (
              <ArticleCard
                key={id}
                {...{
                  title,
                  description,
                  photo: photos.data && photos.data[0],
                  id,
                }}
              />
            )
          )}
        </div>
      </Suspense>
    </>
  )
}
export default ArticlesPage
