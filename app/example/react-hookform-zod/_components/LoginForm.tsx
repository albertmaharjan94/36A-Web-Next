"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema, LoginFormData } from "./schema";

export default function LoginForm() {
    const { 
        register, handleSubmit, formState: { errors, isSubmitting } 
    } 
        = useForm<LoginFormData>(
            {
            resolver: zodResolver(loginSchema),
            defaultValues: {
                email: "default@example.com",
                password: ""
            }
        }
    );
    const onSubmit = (data: LoginFormData) => {
        alert(`Email: ${data.email}, Password: ${data.password}`);
    };
    return (
        <div>
            <h1>Login Form with Zod Validation</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Email</p>
                <input 
                    type="email"
                    className="border p-2 rounded"
                    {...register("email")}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                <p>Password</p>
                <input 
                    type="password"
                    className="border p-2 rounded"
                    {...register("password")}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                <button type="submit" disabled={isSubmitting} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}