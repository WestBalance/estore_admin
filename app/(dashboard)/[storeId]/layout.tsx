import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}: {
    children:React.ReactNode;
    params:{storeId: string}
}) {
    const session = await auth(); // await здесь нужен
    const userId = session.userId; // берём userId из объекта

    if(!userId){
        redirect('/sign-in');
    }
    const resolvedParams = await params;
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId 
        }
    });


    if(!store){
        redirect('/');

    }
    return (
        <>
       <Navbar/>
        {children}
        </>
    );
};