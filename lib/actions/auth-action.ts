"use server"; // server side api call
import { register, login, whoami, updateUser } from "@/lib/api/auth";
import { LoginFormData, RegisterFormData } from "@/app/(auth)/_components/schema";
import { setTokenCookie, storeUserData } from "@/lib/cookies";
import { revalidatePath } from "next/cache";

export const handleRegisterUser = async (data: RegisterFormData) => {
    try{
        // how to handle data from component and how to send to component
        const result = await register(data);
        if(result.success){
            return { success: true, message: result.message, data: result.data }; 
        }else{
            return { success: false, message: result.message || 'Registration failed' };    
        }
    }catch (error: Error | any){
        return { success: false, message: error?.message || 'Registration failed' };    
    }
}
export const handleLoginUser = async (data: LoginFormData) => {
    try{
        // how to handle data from component and how to send to component
        const result = await login(data);
        // set cookie
        const user = result.data.user;
        const token = result.data.token;
        await setTokenCookie(token);
        await storeUserData(user);

        if(result.success){
            return { success: true, message: result.message, data: result.data }; 
        }else{
            return { success: false, message: result.message || 'Login failed' };    
        }
    }catch (error: Error | any){
        return { success: false, message: error?.message || 'Login failed' };    
    }
}

export const handleWhoami = async () => {  
    try{
        const result = await whoami();
        if(result.success){
            return { success: true, message: result.message, data: result.data }; 
        }else{
            return { success: false, message: result.message || 'Fetch user data failed' };    
        }
    }catch (error: Error | any){
        return { success: false, message: error?.message || 'Fetch user data failed' };
    }
}

export const handleUpdateUser = async (data: FormData) => {
    try{
        const result = await updateUser(data);
        if(result.success){
            revalidatePath("/dashboard/profile"); // refresh profile page data
            return { success: true, message: result.message, data: result.data }; 
        }else{
            return { success: false, message: result.message || 'Update user failed' };    
        }
    }catch (error: Error | any){
        return { success: false, message: error?.message || 'Update user failed' };
    }
}