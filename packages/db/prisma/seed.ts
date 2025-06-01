import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
    const william = await prisma.user.upsert({
        where: { number: '9595959595' },
        update: {},
        create: {
            number: '9595959595',
            password: await bcrypt.hash('will123', 10),
            name: 'william',
            Balance: {
                create: {
                    amount:2000,
                    locked:0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 2000,
                    token: "token_3",
                    provider: "HDFC Bank"
                },
            },
        },
    })
    const chris = await prisma.user.upsert({
        where: { number: '9898989898'},
        update: {},
        create: {
            number: '9898989898',
            password: await bcrypt.hash('chris123', 10),
            name: 'chris',
            Balance: {
                create: {
                    amount: 2000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Failure",
                    amount: 2000,
                    token: "token_4",
                    provider: "HDFC Bank",
                },
            },        
        },
    })
    console.log({ william, chris  })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
        
    })