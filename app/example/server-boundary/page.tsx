import { notFound } from "next/navigation";

export default async function Page() {
    const result = await new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data loaded");
        }, 5000); // 5 seconds
    }); // later replaced by api calls

    if(1!==1){
        throw new Error("Error"); // triggers error.tsx
    }
    if(0!==0){
        notFound(); // triggers not-found.tsx
    }

    return (
        <div>
            Page Content
        </div>
    );
}