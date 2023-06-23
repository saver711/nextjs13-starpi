import { gql, useSuspenseQuery } from "@apollo/client"

export const useGetArticles = <T>(id?: number) => {
  const GET_ARTICLES = gql`
    query {
       ${id ? `article(id:${id})` : "articles"}{
        data {
          id
          attributes {
            title
            description
            photos {
              data {
                id
                attributes {
                  name
                  alternativeText
                  url
                }
              }
            }
          }
        }
      }
    }
  `

  return useSuspenseQuery<T>(GET_ARTICLES)
}
