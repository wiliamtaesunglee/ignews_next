import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import styles from './styles.module.scss'

const Posts = () => {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>In his guide, you will learn how to create a Monorepo to manage multiple packages with a shared</p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>In his guide, you will learn how to create a Monorepo to manage multiple packages with a shared</p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>In his guide, you will learn how to create a Monorepo to manage multiple packages with a shared</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post_-_publicati')],
    {
      fetch: ['post_-_publicati.title', 'post_-_publicati.content'],
      pageSize: 100,
    }
  )

  console.log('>>', response)

  return {
    props: {}
  }
}

export default Posts
