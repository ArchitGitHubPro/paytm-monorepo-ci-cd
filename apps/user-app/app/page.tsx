import { PrismaClient } from "@repo/db/client";


const prisma = new PrismaClient();


export default function Home() {

  return (
    <div className="bg-red-200">
      Hi there 
    </div>
  );
}
