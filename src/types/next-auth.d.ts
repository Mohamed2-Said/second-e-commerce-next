import { UserResponse } from "@/interfaces";
import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserResponse & {
      token?: string;
    };
  }

  interface User extends NextAuthUser {
    token?: string;
    user: UserResponse;
  }
}

import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    token?: string;
    user?: UserResponse;
  }
}
