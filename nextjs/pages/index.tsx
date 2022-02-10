import { getAuthToken } from '@/serverSrc/services/auth.service'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

const Index: NextPage = () => {
  return (
    <div>
      Hello, non-member!
      <Link href='/login'>
        <a>Login</a>
      </Link>
    </div>
  )
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const user = getAuthToken(context.req.cookies);
  if (user && user.loggedIn && user.userId) {
    return {
      redirect: {
        permanent: false,
        destination: '/home'
      }
    }
  }

  return { props: {}}
}


export default Index;
