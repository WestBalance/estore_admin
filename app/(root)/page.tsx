import { ClerkProvider, UserButton } from "@clerk/nextjs";

const SetupPage=()=> {
  return (
    <ClerkProvider afterSignOutUrl="/">
<div className="p-4">
<UserButton />
</div> 
</ClerkProvider>
);
}

export default SetupPage;
