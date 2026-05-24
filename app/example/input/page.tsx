"use client"; // state/hooks
import { useState, ChangeEvent } from "react";
export default function InputPage() {
    const [ email, setEmail ] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleSubmit = () => {
        alert(`Email submitted: ${email}`);
    }
    return (
        <div>
            <p>Email: {email}</p>
            <input 
                type="email"
                value={email}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <button onClick={handleSubmit}>Done</button>
        </div>
    );
}