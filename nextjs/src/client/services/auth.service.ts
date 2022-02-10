import { IAuth } from "@/sharedSrc/IAuth";
import axios, { AxiosError } from "axios";

export const login = async (email: string, password: string): Promise<IAuth> => {
  
  try {

    const response = await axios.post<IAuth>('/api/auth/login', {
      email,
      password,
    });
    
    return response.data;

  } catch (err) {
    return {
      loggedIn: false
    }
  }

}

