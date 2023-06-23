import { gql, useMutation } from "@apollo/client"

export const usePostArticleGraph = () => {
  const POST_ARTICLE = gql`
    mutation CreateArticle($title: String, $description: String) {
      createArticle(data: { title: $title, description: $description }) {
        data {
          id
          attributes {
            title
          }
        }
      }
    }
  `

  return useMutation<
    Article,
    { title: string; description: string } 
  >(POST_ARTICLE)
}
