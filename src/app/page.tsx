"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default function Home() {
  const session = useSession();
  console.log(session?.data?.user?.accessToken);


  const test = async() => {
    const data = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({"data": "test"}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(await data.json());
    
  }



  return (
    <div>
      {session?.data ? (
        <>
        <div>Hi {session?.data?.user.accessToken}</div>
        <button onClick={test}>Upload Video</button>
        </>
      ) : (
        <div>No user</div>
      )}
    </div>
  );
}
