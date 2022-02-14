import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { login } from '@/clientSrc/services/auth.service';
import { UserContext } from '@/clientSrc/components/UserProvider';
import { AppPage } from '@/clientSrc/AppPage';

const Login: AppPage = () => {
  const router = useRouter();
  const { user, refresh } = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    console.log(1);
    e.preventDefault();
    console.log(2);
    const loginResponse = await login(email, password);
    console.log(loginResponse);
    if (loginResponse.loggedIn) {
      refresh();
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

Login.redirectAuthUsers = true;
export default Login;