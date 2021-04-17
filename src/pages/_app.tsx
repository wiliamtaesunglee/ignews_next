import { AppProps } from 'next/app'
import Header from '../components/Header'
import '../../styles/glocal.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <Header />
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
