type ArticleAttributes = {
  title: string
  description: string
  photos: {
    data: ApiPhoto[] | null
  }
}

type Articles = {
  articles: {
    data: {
      id: number
      attributes: ArticleAttributes
    }[]
  }
}
type Article = {
  article: {
    data: {
      id: number
      attributes: ArticleAttributes
    }
  }
}

type ArticleRest = {
    data: {
      id: number
      attributes: ArticleAttributes
    }
}

type ArticlesRest = {
    data: {
      id: number
      attributes: ArticleAttributes
    }[]
}