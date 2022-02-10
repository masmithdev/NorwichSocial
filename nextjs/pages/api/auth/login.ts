import { getJWT, getUserFromJWT } from '@/serverSrc/services/auth.service';
import { IAuth } from '@/sharedSrc/IAuth';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<IAuth>) {

  if (req.method === 'POST') {
    const { email, password } = req.body;
    const response = getJWT(email, password);

    console.log(response)
    if (response && response.success && response.data) {

      const cookie = serialize('S', response.data, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      res.setHeader("Set-cookie", cookie);      
      const authUser = getUserFromJWT(response.data);
      console.log(authUser)
      return res.json(authUser);    
    }
    
    if (!response || !response.success) {
      return res.status(401).json({
        loggedIn: false,
      });
    }
  }
  
  return res.status(405).json({
    loggedIn: false,
  });
  
}


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '200b',
    },
  },
}