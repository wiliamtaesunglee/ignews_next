import styles from './styles.module.scss'

interface ISubcribeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: ISubcribeButtonProps) => {
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
