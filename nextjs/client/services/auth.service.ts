export type LoginResponse = {
  success: boolean;
  message?: string;
}

export const login = (username: string, password: string): LoginResponse => {
  return {
    success: true,
    message: "login successful"
  };
}