"use client"
import { PrismaClient } from "@repo/db/client";
import { useBalance } from "@repo/store/balance";
import { Appbar } from "@repo/ui/Appbar"


const prisma = new PrismaClient();


export default function Home() {
  const balance = useBalance();

  return (
    <div className="bg-red-200">
      {/* <Appbar  onSignin={signIn} onSignout={signOut} user={session.data?.user}/> */}
      Hi there {balance}
    </div>
  );
}
