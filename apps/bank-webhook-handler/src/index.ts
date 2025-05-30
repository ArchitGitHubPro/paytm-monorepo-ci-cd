import express from "express";
import z from "zod";

const app = express();
app.use(express.json());
const PORT = 3000;

app.post('/hdfcwebhook', async (req, res) => {

    const body = req.body;
    const paymentSchema = z.object({
        token: z.string(),
        userId: z.string(),
        amount: z.number()
    })

    const paymentInformation = paymentSchema.safeParse(body);

    try {    
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

    res.json(validpaymentInfo);

    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })    
    }




    

})






app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})