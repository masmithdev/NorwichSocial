import { GetServerSideProps, NextPage } from "next";
import jwt from 'jsonwebtoken';

type HomeProps = {
  loggedIn: boolean,
  userID?: string;
}

const Home : NextPage<HomeProps> = (props) => {
  if (props.loggedIn){
    return <div>Hello, member {props.userID}!</div>
  }
  return <div>Nothing to see here...</div>
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const secureCookie = context.req.cookies['S'];
  console.log('home');
  if (secureCookie) {
    const decoded: any = jwt.verify(secureCookie, process.env.JSON_SIGNING_KEY!);
    if (decoded) {
      return {
        props: {
          loggedIn: !!decoded.user,
          userID: decoded.user
        }
      }
    }
  }

  return {
    props: {
      loggedIn: false,
    }
  }
}


export default Home;

