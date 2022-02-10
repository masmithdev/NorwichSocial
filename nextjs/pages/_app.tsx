import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { IBaseProps } from '../src/shared/IBaseProps'

interface CustomAppProps extends AppProps<IBaseProps> {
  pageProps : IBaseProps;
}

function MyApp({ Component, pageProps }: CustomAppProps) {

  return (
      <Component {...pageProps} />
  )
}

export default MyApp
