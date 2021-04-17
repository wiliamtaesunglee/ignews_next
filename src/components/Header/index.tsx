import SignInButton from '../SignInButton'

import styles from './styles.module.scss'

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src='/images/logo.svg' alt='logo' />
        <nav>
          <a className={styles.active}>Home</a>
          <a>posts</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}

export default Header
