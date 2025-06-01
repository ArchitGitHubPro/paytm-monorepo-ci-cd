import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod"
import bcrypt from "bcrypt";
import { PrismaClient } from "@repo/db/client";



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                phone: { label: 'Phone Number', type: 'text', placeholder: '987654310'},
                password: { label: 'Password' , type: 'password'}
            },
            async authorize(credentials: Record<string, string> | undefined) {

                const prisma = new PrismaClient;


                //zod validation
                const credentialSchema = z.object({
                    phone: z.string()
                            .min(10, 'Phone Number must be at least 10 digits')
                            .max(15, 'Phone Number must be at most 15 digts'),
                    password: z.string()
                            .min(4, 'Password is required')        
                });

                const validatedCredentials = credentialSchema.safeParse(credentials);

                if (!validatedCredentials.success) {
                    return null;
                }

                const { phone, password } = validatedCredentials.data;


                //find user if exists
                const existingUser = await prisma.user.findFirst({
                    where: {
                        number: phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                    return null;
                }

                try {
                                    
                    // password hashing
                    const hashedPassword = await bcrypt.hash(password,10);
                    const user = await prisma.user.create({
                        data: {
                            number: phone,
                            password: hashedPassword
                        }
                    })
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                } catch (e) {
                    console.log(e);     
                }
                return null
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({ token, session }: any) {
            if (session && session.user) {
                session.user.id = token.sub    
            }
            return session;
        }
    }

}

