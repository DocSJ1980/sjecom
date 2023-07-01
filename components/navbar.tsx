import { UserButton } from "@clerk/nextjs"
import MainNav from "./mainNav"

const Navbar = () => {
    return (
        <div className="border-b ">
            <div className="flex h-16 items-center px-4">
                <div>This is a store switcher</div>
                <MainNav className="px-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )

}

export default Navbar