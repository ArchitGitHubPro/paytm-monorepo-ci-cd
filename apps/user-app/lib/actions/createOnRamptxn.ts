'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { PrismaClient } from "@repo/db/client";

export async function createOnRampTransactions(amount: string, provider: string) {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const prisma = new PrismaClient();
    const token = Math.random().toString();
    if (!userId) {
        return {
            message: "User not logged in"
        }
    }
    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: Number(amount),
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })

    return {
        message: "On ramp transaction added"
    }
}