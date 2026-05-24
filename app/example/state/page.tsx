"use client"; // IMPORTANT: 
// state can only be used in client-side components
import { useState, useEffect } from "react";

export default function Page() {
    const [count, setCount] = useState(0);
    const handleDecrease = () => {
        setCount(count - 1);
    }
    useEffect(
        () => {
            alert("Page loaded")
        },
        [] // dependencies, if empty, runs only once when component mounts
    )
    useEffect(
        () => {
            alert(`Count changed: ${count}`);
        },
        [count] // runs when count changes and initialize
    )
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>
            <button onClick={handleDecrease}>
                Decrease
            </button>
        </div>
    );
}