import prismadb from "@/lib/prismadb";
import {SizeForm} from "./components/size-form"

interface SizePageProps {
  params: Promise<{ sizeId: string }>; // params как Promise
}


const SizePage = async ({ params }: SizePageProps) => {
  const resolvedParams = await params; // ждём Promise
  const size = await prismadb.size.findUnique({
    where: {
      id: resolvedParams.sizeId,
    },
  });
    return ( 
        <div className="flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size}/>
            </div>
        </div>
     );
}
 
export default SizePage;