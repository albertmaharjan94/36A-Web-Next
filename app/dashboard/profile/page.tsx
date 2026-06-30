// app/dashboard/profile/page.tsx
// "use client";
import { handleWhoami } from "@/lib/actions/auth-action";
import { notFound } from "next/navigation";
import UpdateForm from "./_components/UpdateForm";

export const dynamic = "force-dynamic";

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
            <UpdateForm user={user.data} />
        </div>
    );
}