import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        console.log("[STORES_POST]: ", body)
        const { name } = body
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!name) {
            return new NextResponse("Bad Request", { status: 400 })
        }
        const store = await prismadb.Store.create({
            data: {
                name,
                userId
            }
        })
        return new NextResponse(JSON.stringify(store), { status: 200 })
    }
    catch (error) {
        console.log("[STORES_POST]: ", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}