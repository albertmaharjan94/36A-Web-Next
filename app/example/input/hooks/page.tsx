"use client"; // client-side
import useLoginForm from "./useLoginForm";
export default function HookPage() {
    const { email, handleEmailChange, handleSubmit } = useLoginForm();
    // const hook = useLoginForm();
    // hook.email, hook.handleEmailChange, hook.handleSubmit
    return (
        <div>
            <h1>Login Form</h1>
            <input 
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="border p-2 rounded"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}