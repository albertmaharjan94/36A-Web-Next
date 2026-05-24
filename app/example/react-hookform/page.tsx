"use client"; // using hookform
import { useForm } from "react-hook-form";
export default function Page() {
    const { 
        register, // implement in input field
        handleSubmit, // form submit handler
        formState: { errors, isSubmitting } // validation errors, submit state
    } = useForm(
        {
            defaultValues: {
                email: "", // states
                password: ""
            }
        }
    );
    const handleFormSubmit = (data: any) => {
        alert(`Email: ${data.email}, Password: ${data.password}`);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <p>Email</p>
                <input 
                    className="border p-2 rounded"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <p>Password</p>
                <input 
                    className="border p-2 rounded"  
                    type="password"
                    {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </form>
        </div>
    );
}