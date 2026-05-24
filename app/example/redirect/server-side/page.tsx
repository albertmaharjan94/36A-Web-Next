import ServerAction from "./server-action"; 

export default function Page() {
    return (
        <div>
            <button onClick={ServerAction}>
                Click me to trigger server action
            </button>
        </div>
    );
}