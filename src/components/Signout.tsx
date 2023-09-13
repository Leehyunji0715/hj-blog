'use client';

import { signOut } from "next-auth/react";
import Button from "./Button";

export default function SignOut() {
    return (
          <Button text='admin signout' onClick={() => signOut()}/>
      )
}