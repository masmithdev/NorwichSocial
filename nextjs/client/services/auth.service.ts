import axios, { AxiosError } from "axios";

export type LoginResponse = {
  success: boolean;
  message?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  
  try {
    const response = await axios.post<LoginResponse>('/api/auth/login', {
      email,
      password
    })

    return {
      success: response.data.success
    }

  } catch (err) {
    return {
      success: false,
      message: (err as AxiosError).message
    }
  }
}