import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/client'
import { RichText } from 'prismic-dom'
import { getPrismiClient } from '../../services/prismic'

interface PostProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

const Post = ({ post }: PostProps) => {
  return (
    <>
      <Head>
        <title>{post.title} | ignews</title>
      </Head>

      <main>
        <article>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })
  const { slug } = params

  const prismic = getPrismiClient(req)

  const response = await prismic.getByUID('post_-_publicati', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleTimeString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    }
  }
}

export default Post