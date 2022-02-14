import { NextPage } from "next";
import { IClientUser } from "./IClientUser";

export type AppPage = NextPage & {
  isPrivate?: boolean;
  redirectAuthUsers?: boolean;
  hasAccess?: (user: IClientUser) => boolean;
}