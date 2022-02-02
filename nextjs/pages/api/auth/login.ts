import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

type Response = {
  success: boolean
}

const secret: string = process.env.JSON_SIGNING_KEY!;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  console.log(1);
  if (req.method === 'POST') {
    console.log(2);
    const { email, password, persistent } = req.body;
    console.log({email, password});
    if (email && password){
      console.log(4);
      if (email === 'test@test.com' && password === 'P4S5W0R2') {
        console.log(5);
        const maxAge = 60 * 60 * 24 * 30;

        const token = sign(
          {
            user: '0001',
            exp: Math.floor(Date.now() / 1000) + maxAge,
          },
          secret,
        );
        console.log(6);
        const cookie = serialize("S", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: maxAge,
          path: "/",
        });
        console.log(7);
        res.setHeader('Set-Cookie', cookie);
        console.log(8);
        return res.status(200).json({
          success: true,
        });
      }
    }
    console.log(9);
    return res.status(401).json({
      success: false,
    });
  }
  console.log(10);
  return res.status(405).json({
    success: false,
  });
  
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '200b',
    },
  },
}