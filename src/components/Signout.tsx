'use client';

import { signOut } from "next-auth/react";
import TextButton from "./TextButton";
import { $Enums } from "@prisma/client";

type Props = {
    role: $Enums.Role;
}

export default function SignOut({ role }: Props) {
    const roleName = role === $Enums.Role.ADMIN ? "Admin" : "User";
    return (
          <TextButton 
            text={`${roleName} signout`} 
            size="small"
            onClick={() => signOut()}
        />
      )
}