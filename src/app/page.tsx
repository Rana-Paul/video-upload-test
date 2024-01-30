import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.accessToken);
  
  
  return (
    <div>
      {session?.user? (<div>Hi {session.user.accessToken}</div>) : (<div>No user</div>)}
    </div>
  );
}
