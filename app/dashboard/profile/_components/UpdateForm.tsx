"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const updateSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
})
type UpdateFormData = z.infer<typeof updateSchema>;

export default function UpdateForm(
    { user }: { user: any }
) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<UpdateFormData>({
        resolver: zodResolver(updateSchema),
        defaultValues:{
            firstName: user.firstName || '',
            lastName: user.lastName || '',
        }
    });

    const onSubmit = (data: UpdateFormData) => {
        // isPending is true during the transition, 
        // and false after it finishes
        setError('');
        startTransition(
            async () => {
                try {
                    
                } catch (error: any) {
                    setError(error?.message || 'Update failed');
                }
            }
        );
    }
    return (
        <div className="max-w-md mx-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <div className="mb-4 text-red-500 border border-red-500 p-2 rounded">{error}</div>}
                
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
                
                <button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    {isPending ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
}