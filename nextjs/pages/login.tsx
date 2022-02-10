import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getAuthToken } from '@/serverSrc/services/auth.service';
import { login } from '@/clientSrc/services/auth.service';

const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const loginResponse = await login(email, password);
    console.log(loginResponse);
    if (loginResponse.loggedIn) {
      router.push('/home');
    }
    else {
      console.log(loginResponse);
    }
  }

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.target.value);
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.target.value);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" value={email} onChange={handleEmailChange} autoComplete="email"></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" value={password} onChange={handlePasswordChange} autoComplete="new-password"></input>
        </div>

        <input type="submit" value="Login"></input>
      </form>
      <div>Not a member? <Link href="/register"><a>Join us here!</a></Link></div>
    </div>
  );
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

export default Login;