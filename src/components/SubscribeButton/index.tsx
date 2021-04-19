import { useSession, signIn } from 'next-auth/client'
import styles from './styles.module.scss'

interface ISubcribeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: ISubcribeButtonProps) => {
  const [session] = useSession()
  const handleSubscribe = () => {
    if (!session) {
      signIn('github')
      return
    }
  }
  
  return (
    <button
      type='button'
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  )
}

export default SubscribeButton
