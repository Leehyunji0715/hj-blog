'use client';

import { signIn } from "next-auth/react";
import Button from "./Button";

export default function SignIn() {
    return (
          <Button text={`Are u admin?`} onClick={() => signIn('google', { callbackUrl: '/' })}/>
      )
}