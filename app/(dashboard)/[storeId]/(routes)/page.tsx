import prismadb from "@/lib/prismadb"
import React from "react"

interface DashboardPageProps {
    params: {
        storeId: string
    }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const store = await prismadb.Store.findFirst({
        where: {
            id: params.storeId,
        },
    })
    return (
        <div>
            Active Store: {store?.name}
        </div>
    )
}

export default DashboardPage