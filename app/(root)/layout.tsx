import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"


/**
 * Sets up the layout for the component.
 *
 * @param {{ children: React.ReactNode }} props - The component props.
 * @returns {Promise<React.ReactNode>} The layout with the children.
 */
export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Get the current user ID
    const { userId } = auth()

    // If there is no user ID, redirect to the sign-in page
    if (!userId) redirect("/sign-in")

    // Find the user's store
    const store = await prismadb.store.findFirst({
        where: {
            userId,
        },
    })

    // If a store is found, redirect to the store's page
    if (store) redirect(`/${store.id}`)

    // Return the layout with the children
    return <>{children}</>
}
