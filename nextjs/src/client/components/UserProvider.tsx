import { IClientUser } from "@/clientSrc/IClientUser";
import { AppResponse } from "@/sharedSrc/AppResponse";
import axios, { AxiosError } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";


const fetcher = async (url: string): Promise<AppResponse<IClientUser>> => {
  try {
    const res = await axios.get<AppResponse<IClientUser>>(url);
    console.log(res);
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      return {
        success: false,
        message: err.message
      }
    }
  }

  return {
    success: false
  }
}


interface Props {
  children: ReactNode;
}

interface IUserContext {
  user?: IClientUser;
  refresh: () => Promise<void>;
}

export const UserContext = createContext<IUserContext>({
  refresh: () => new Promise<void>((res, rej) => res())
});

const UserProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<IClientUser>();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {

    const user = await fetcher('/api/auth/getuser');
    console.log(user);
    if (user && user.success && user.data) {
      setUser(user.data);
    } else {
      setUser({
        isLoggedIn: false,
      });
    }
  }

  const value: IUserContext = {
    user,
    refresh: () => getUser()
  }

  return (
    <UserContext.Provider value={value} >
      {children}
    </UserContext.Provider>
  );

}

export default UserProvider;