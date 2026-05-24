"use server"; // server-side 
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function ServerAction() {
    // check security, cookies, session, auth, etc
    // more secure than client-side action
    revalidatePath("/example/image"); // reload data 
    redirect("/example/image");
}