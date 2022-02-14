import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"

interface Props {
  children: ReactNode;
  isPrivate?: boolean;
  redirectAuthUsers?: boolean;
}

export const ApplicationWrapper = ({ children, isPrivate, redirectAuthUsers }: Props) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  console.log(1);

  if (user) {
    console.log(2);
    if (isPrivate && !user.isLoggedIn) {
      console.log(3);
      router.push(router.basePath + './login');
      return (<></>)
    }

    if (redirectAuthUsers && user.isLoggedIn) {
      console.log(4);
      router.push(router.basePath + '/home');
      return (<></>);
    }

    console.log(5);
  }

  if (!user) {
    return (
      <div>2 secs, just getting things ready</div>
    )
  }

  return (
    <>
      {user.userName}
      {children}
    </>
  )
}
