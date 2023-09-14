import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignIn from "./SignIn";
import SignOut from "./Signout";

export default async function Footer() {
    const session = await getServerSession(authOptions);

    return (
        <footer>
          All rights reserved &copy; Hyunji, Lee {new Date().getFullYear()}
          { session ? <SignOut role={session.user.role}/> : <SignIn/> }
        </footer>
    );
}