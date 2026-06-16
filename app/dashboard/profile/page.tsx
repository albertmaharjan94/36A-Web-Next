import { handleWhoami } from "@/lib/actions/auth-action";
import { notFound } from "next/navigation";

export default async function Page() {
    const user = await handleWhoami(); // loading
    if(!user.success){
        throw new Error(user.message); // triggers error.tsx
    }
    if(!user.data){
        notFound(); // triggers not-found.tsx
    }
    
    return (
        <div>
            User Details:
            {user.data.email}
        </div>
    );
}