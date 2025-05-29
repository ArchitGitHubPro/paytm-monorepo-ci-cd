"use client"
import { PrismaClient } from "@repo/db/client";
import { useBalance } from "@repo/store/balance";
import { Appbar } from "@repo/ui/Appbar"
import { signIn, signOut, useSession } from "next-auth/react";


const prisma = new PrismaClient();


export default function Home() {
  const balance = useBalance();
  const session = useSession();

  return (
    <div className="bg-red-200">
      <Appbar  onSignIn={signIn} onSignOut={signOut} user={session.data?.user}/>
      Hi there {balance}
    </div>
  );
}
