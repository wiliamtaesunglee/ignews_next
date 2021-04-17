import { GetStaticProps } from 'next'
import Head from "next/head";
import SubscribeButton from "../components/SubscribeButton";
import { stripe } from '../services/stripe';

import styles from './home.module.scss'

interface IHomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

const Home = ({ product }: IHomeProps) => {
  const { amount, priceId } = product
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get access to all the pblications<br />
            <span>for {amount} month</span>
          </p>

          <SubscribeButton priceId={priceId} />
        </section>

        <img src='/images/avatar.svg' alt='Girl coding' />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IhLcHLCbvnugj0yG3ESxgII', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24,
  }
}

export default Home
