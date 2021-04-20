import { useSession, signIn } from 'next-auth/client'
import { api } from '../../services/api'
import { getStripeJS } from '../../services/stype-js'
import styles from './styles.module.scss'

interface ISubcribeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: ISubcribeButtonProps) => {
  const [session] = useSession()
  
  const handleSubscribe = async () => {
    if (!session) {
      signIn('github')
      return
    }

    const stripe = await getStripeJS()

    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data
      const stripe = await getStripeJS()
      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <button
      type='button'
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}

export default SubscribeButton
