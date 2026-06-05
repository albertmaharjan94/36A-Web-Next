export default function PropsPage() {
    const name = 10;
    return (
        <div>
            <ParentComponent name={name} />
            {/* <ParentComponent name="Naya name"/> */}
        </div>
    );
}
// { props }: { props type }
function ParentComponent(
    { name }: { name: number }
) {
    return (
        <div className="border p-2">
            Props Value: {name}
            <ChildCompoment name={name}/>
        </div>
    )
}
interface ChildCompomentProps {
    name: number
}
function ChildCompoment(
    { name }: ChildCompomentProps
) {
    return (
        <div className="border p-2">
            Child compoment: {name}
        </div>
    )
}