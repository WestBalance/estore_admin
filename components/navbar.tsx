import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
     const session = await auth(); // await здесь нужен
    const userId = session.userId; // берём userId из объекта
   
    if(!userId) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where:{
            userId,
        },
    });


    return ( 
        <div className="border-b ">
         <div className="flex h-16 items-center px-4">
           <StoreSwitcher items={stores}/>
          <MainNav className="mx-6"/>
            <ClerkProvider afterSignOutUrl="/">
            <div className="ml-auto flex items-center space-x-4">
                <UserButton />
            </div>
            </ClerkProvider>
         </div>
        </div>
     );
}
 
export default Navbar;