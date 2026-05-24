import { z } from "zod";
export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string("Password is required")
    .min(6, "Password must be at least 6 characters")
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    email: z.email("Invalid email address"),
    firstName: z.string("First name is required"),
    lastName: z.string("Last name is required"),
    username: z.string("Username is required")
    .min(3, "Username must be at least 3 characters"),
    password: z.string("Password is required")
    .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string("Confirm Password is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// make a RegisterForm in _components with confirm password field, 
// validate that password and confirm password match, 
// and display error message if they don't match.
// Register page -> RegisterForm component -> schema for validation
// /example/react-hookform-zod-register/page.tsx ->
// /example/react-hookform-zod-register/_components/RegisterForm.tsx -> schema.ts