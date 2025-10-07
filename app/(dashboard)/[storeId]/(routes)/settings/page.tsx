import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
  params: Promise<{ storeId: string }>; // 👈 теперь params — Promise
}


const SettingsPage:React.FC<SettingsPageProps> =async ({params}) => {

     const session = await auth(); // await здесь нужен
     const { storeId } = await params; // 👈 обязательно await
     const userId = session.userId;

     if (!userId){
        redirect("/sign-in");
     }

     const store =  await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId: userId
        }
     });

     if (!store) {
        redirect("/");
     }


    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
               <SettingsForm initialData={store} />
            </div>          
        </div>
     );
}
 
export default SettingsPage;