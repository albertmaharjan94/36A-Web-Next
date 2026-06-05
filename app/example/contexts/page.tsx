"use client"; // context is client side
import { createContext, useContext, ReactNode, useState } from "react";
const CountContext = createContext<any>(null);
export const CountProvider = ({ children }: { children: ReactNode }) => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    return (
        <CountContext.Provider value={{ count, increment, decrement }}>
            {children}
        </CountContext.Provider>
        // value -> what to expose
    )
}
export default function ContextPage() {
    return (
        <div>
            <CountProvider>
                <ChildCompoment />
            </CountProvider>
        </div>
    );
}
function ChildCompoment() {
    const { count } = useContext(CountContext);
    return (
        <div className="border p-2">
            {count}
            <GrandChildCompoment />
        </div>
    )
}
function GrandChildCompoment() {
    const { count, increment } = useContext(CountContext);
    return (
        <div className="border p-2">
            {count}
            <button onClick={increment}>Increate</button>
        </div>
    )
}