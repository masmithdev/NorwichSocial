import { AppPage } from '@/clientSrc/AppPage'
import { AppProps } from 'next/app'
import '../styles/globals.scss'
import UserProvider from '@/clientSrc/components/UserProvider'
import { ApplicationWrapper } from '@/clientSrc/components/ApplicationWrappr'

type CustomAppProps = AppProps & {
  Component: AppPage;
}

function MyApp({ Component, pageProps }: CustomAppProps) {

  return (
    <UserProvider>
      <ApplicationWrapper isPrivate={Component.isPrivate} redirectAuthUsers={Component.redirectAuthUsers}>
        <Component {...pageProps} />
      </ApplicationWrapper>
    </UserProvider>
  )
}

export default MyApp
