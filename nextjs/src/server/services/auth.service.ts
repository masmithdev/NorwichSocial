import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { AppResponse } from '@/sharedSrc/AppResponse';
import { IAuth } from '@/sharedSrc/IAuth';
//import { sign } from 'jsonwebtoken';

export interface IAuthToken {
  userId: string,
  userName: string,
  exp: number
}

export const getJWT = (email: string, password: string): AppResponse<string> => {
  if (email && password){
    // todo: replace with real login
    if (email === 'test@test.com' && password === 'password') {
      const maxAge = 60 * 60 * 24 * 30;
      
      const payload: IAuthToken = {
        userId: '0001',
        userName: 'Michael',
        exp: Math.floor(Date.now() / 1000) + maxAge,
      }

      const token = jwt.sign(
        payload,
        process.env.JSON_SIGNING_KEY!
      );

      return {
        success: true,
        message: 'Logged in',
        data: token,
      }
    }
  }

  return {
    success: false,
    message: 'Incorrect credentials', // maybe
  }
}

///
export const getAuthToken = (cookies: { [key: string]: string }): IAuth => {

  if (cookies) {
    const cookie = cookies['S'];
    if (cookie) {
      return getUserFromJWT(cookie);
    }
  }
   
  return {
    loggedIn: false,
  }
}

export const getUserFromJWT = (token: string): IAuth => {
  const verifiedToken = jwt.verify(token, process.env.JSON_SIGNING_KEY!) as IAuthToken;

  if (verifiedToken && verifiedToken.userId) {
    return {
      loggedIn: true,
      userId: verifiedToken.userId,
      userName: verifiedToken.userName,
    }
  }

  return {
    loggedIn: false,
  }
}