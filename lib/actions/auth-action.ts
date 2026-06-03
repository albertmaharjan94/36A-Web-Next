"use server"; // server side api call
import { register } from "@/lib/api/auth";
import { RegisterFormData } from "@/app/(auth)/_components/schema";
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