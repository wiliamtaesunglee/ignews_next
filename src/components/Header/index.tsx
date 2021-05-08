import { useRouter } from 'next/router'
import Link from 'next/link'
import ActiveLink from '../AcriveLink'
import SignInButton from '../SignInButton'

import styles from './styles.module.scss'

const Header = () => {
  const { asPath } = useRouter()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src='/images/logo.svg' alt='logo' />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a className={styles.active}>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}

export default Header
