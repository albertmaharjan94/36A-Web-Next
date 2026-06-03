// app/(auth)/_components/RegisterForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterFormData } from "@/app/(auth)/_components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleRegisterUser } from "@/lib/actions/auth-action";

export default function RegisterForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        // isPending is true during the transition, 
        // and false after it finishes
        setError('');
        startTransition(
            async () => {
                try {
                    const result = await handleRegisterUser(data);
                    if (result.success) {
                        router.push("/login");
                    }else{
                        setError(result.message || 'Registration failed');
                    }
                } catch (error: any) {
                    setError(error?.message || 'Registration failed');
                }
            }
        );
    }
    return (
        <div className="max-w-md mx-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <div className="mb-4 text-red-500 border border-red-500 p-2 rounded">{error}</div>}
                <div className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input
                        type="email"
                        {...register("email")}
                        placeholder="Email"
                        className="w-full border p-2 rounded"
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">First Name:</label>
                    <input
                        type="text"
                        {...register("firstName")}
                        className="w-full border p-2 rounded"
                    />
                    {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Last Name:</label>
                    <input
                        type="text"
                        {...register("lastName")}
                        className="w-full border p-2 rounded"
                    />
                    {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Username:</label>
                    <input
                        type="text"
                        {...register("username")}
                        className="w-full border p-2 rounded"
                    />
                    {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password:</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="w-full border p-2 rounded"
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Confirm Password:</label>
                    <input
                        type="password"
                        {...register("confirmPassword")}
                        className="w-full border p-2 rounded"
                    />
                    {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    {isPending ? "Registering..." : "Register"}
                </button>
                <div className="mt-4">
                    <p className="mt-4 text-center">
                        Already have an account? <a href="/login" className="text-blue-500">Login here</a>.
                    </p>
                </div>
            </form>
        </div>
    );
}