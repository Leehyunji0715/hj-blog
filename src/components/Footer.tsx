// 'use client';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getProviders, useSession, signIn, signOut } from "next-auth/react"
import Button from "./Button";
import SignIn from "./SignIn";
import SignOut from "./Signout";

export default async function Footer() {
    // const { data: session } = useSession();
    const session = await getServerSession(authOptions);
    const providers = (await getProviders()) ?? {};
    console.log("providers", providers);
    // if ()

    return (
        <footer>
          All rights reserved &copy; Hyunji, Lee {new Date().getFullYear()}
          { session ? <SignOut/> : <SignIn/> }
          {/* { session ? <Button text="Admin"/> : <Button text="Are U Admin?" onClick={() => signIn()}/> } */}
          {/* { session ? <button onClick={() => signOut()}>Admin</button> 
            : <button onClick={() => signIn()}>Are U Admin?</button> } */}
        </footer>
    );
}