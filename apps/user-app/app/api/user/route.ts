import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export const GET = async () => {
    try {
        const session = await getServerSession(authOptions)
        if (session.user) {
            return NextResponse.json({
                user: session.user
            })
        }
        return NextResponse.json({
            message: 'Your are not logged in'
        }, {
            status: 403
        })
    }    

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (e) {
        return NextResponse.json({
            message: 'Auth error'
        }, {
            status: 500
        })
    }
}

// export async function GET() {
//     return NextResponse.json({ message: "Route is accessible!" })
// }