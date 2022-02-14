import { AppPage } from '@/clientSrc/AppPage'
import Link from 'next/link'

const Index: AppPage = () => {
  return (
    <div>
      Hello, non-member!
      <Link href='/login'>
        <a>Login</a>
      </Link>
    </div>
  )
}

Index.redirectAuthUsers = true;
export default Index;
