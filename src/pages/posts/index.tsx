import Head from 'next/head'
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

export default Posts
