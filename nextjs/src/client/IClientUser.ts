export interface IClientUser {
  isLoggedIn: boolean;
  userName?: string;
  userId?: string;
  permissions?: string[]
}