import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { name } = body
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400 })
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        const store = await prismadb.Store.updateMany({
            where: {
                id: params.storeId,
                userId,
            },
            data: {
                name
            }
        })
        return new NextResponse(JSON.stringify(store), { status: 200 })
    } catch (error) {
        console.log("[STORES_PATCH]: ", error)
        new NextResponse("Internal Server Error", { status: 500 })
    }
}
export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400 })
        }
        const store = await prismadb.Store.deleteMany({
            where: {
                id: params.storeId,
                userId,
            }
        })
        return new NextResponse(JSON.stringify(store), { status: 200 })
    } catch (error) {
        console.log("[STORES_DELETE]: ", error)
        new NextResponse("Internal Server Error", { status: 500 })
    }
} 