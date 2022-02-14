import { IClientUser } from "@/clientSrc/IClientUser";
import { getUserFromJWT } from "@/serverSrc/services/auth.service";
import { AppResponse } from "@/sharedSrc/AppResponse";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<IClientUser>>) {
  console.log('getuser');
  const session = req.cookies['S'];

  if (session) {
    console.log(session);
    const user = getUserFromJWT(session);
    if (user) {
      console.log(user);
      const response: AppResponse<IClientUser> = {
        success: true,
        data: {
          isLoggedIn: true,
          userId: user.userId,
          userName: user.userName
        }
      }

      return res.json(response);
    }
  }

  return res.json({
    success: false
  });
}