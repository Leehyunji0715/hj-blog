import { $Enums } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & { role: $Enums.Role };
  }
}