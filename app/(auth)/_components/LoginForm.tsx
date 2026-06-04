// app/(auth)/_components/LoginForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/app/(auth)/_components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleLoginUser } from "@/lib/actions/auth-action";
export default function LoginForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        // isPending is true during the transition, 
        // and false after it finishes
        setError('');
        startTransition(
            async () => {
                try {
                    const result = await handleLoginUser(data);
                    if (result.success) {
                        router.push("/dashboard");
                    }else{
                        setError(result.message || 'Login failed');
                    }
                } catch (error: any) {
                    setError(error?.message || 'Login failed');
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
                    <label className="block mb-1">Password:</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="w-full border p-2 rounded"
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>
                
                <button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    {isPending ? "Logging in..." : "Login"}
                </button>
                <div className="mt-4">
                    <p className="mt-4 text-center">
                        Don't have an account? <a href="/register" className="text-blue-500">Register here</a>.
                    </p>
                </div>
            </form>
        </div>
    );
}