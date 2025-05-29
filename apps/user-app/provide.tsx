"use client"
import { Provider as JotaiProvider } from "jotai";
import { SessionProvider } from "next-auth/react";

export const Provider = ({children} : {children: React.ReactNode}) => {
    return <SessionProvider>
        <JotaiProvider>
            {children} 
    </JotaiProvider>
    </SessionProvider>
}