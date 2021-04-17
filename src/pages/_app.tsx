import { AppProps } from 'next/app'
import '../../styles/glocal.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
