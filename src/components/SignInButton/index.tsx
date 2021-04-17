import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

const SignInButton = () => {
  const isuserLogged = true
  return isuserLogged
    ? (
      <button className={styles.signInButton} type='button'>
        <FaGithub color='#04d361'/>
        Wiliam Lee
        <FiX color='#737380' className={styles.closeIcon} />
      </button>
    )
    : (
      <button className={styles.signInButton} type='button'>
        <FaGithub color='#eba417'/>
        Sign in width Github
      </button>
    )
}

export default SignInButton
