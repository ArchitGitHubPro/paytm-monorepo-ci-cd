import express from "express";
import z from "zod";
import { PrismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());
const PORT = 3000;


app.post('/hdfcwebhook', async (req, res) => {
    const prisma = new PrismaClient();
    const body = req.body;
    const paymentSchema = z.object({
        token: z.string(),
        userId: z.number(),
        amount: z.number()
    })

    const paymentInformation = paymentSchema.safeParse(body);

        
        if (!paymentInformation.success) {
            res.status(401).json({
            message: "Enter Valid Details"
        });
        return;
    }
    
    const { token, userId, amount } = paymentInformation.data;

    const validpaymentInfo = {
        token: token,
        userId: userId,
        amount: amount
    }
    try {
        await prisma.$transaction([
            prisma.balance.update({
               where: {
                   userId: (validpaymentInfo.userId),
               },
               data: {
                   amount: {
                       increment: validpaymentInfo.amount
                   }
               }
           })
        ])

        await prisma.$transaction([
            prisma.onRampTransaction.update({
                where: {
                    token : validpaymentInfo.token,
                },
                data: {
                    status: "Success"
                }
            })
        ])
        res.status(200).json({
            message: "captured"
        })

    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })    
    }
})


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})