import { useState, ChangeEvent} from "react";
// hook naming convention: use + Name
export default function useLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // hook returns states and handlers, abstract logic away from component
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleSubmit = () => {
        alert(`Email: ${email}, Password: ${password}`);
    }
    return {
        email, password, 
        handleEmailChange, handlePasswordChange, handleSubmit
    };
}