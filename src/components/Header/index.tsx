import Link from 'next/link'
import SignInButton from '../SignInButton'

import styles from './styles.module.scss'

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src='/images/logo.svg' alt='logo' />
        <nav>
          <Link href="/">
            <a className={styles.active}>Home</a>
          </Link>
          <Link href="/posts" prefetch>
            <a>posts</a>
          </Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}

export default Header
