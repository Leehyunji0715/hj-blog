'use client';

import { signIn } from "next-auth/react";
import TextButton from "./TextButton";

export default function SignIn() {
    return (
        <TextButton 
            text='Are u admin?' 
            onClick={() => signIn('google', { callbackUrl: '/' })}
        />
      )
}