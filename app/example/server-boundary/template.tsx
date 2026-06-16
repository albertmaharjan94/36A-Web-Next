export default function Template({children}: { children: React.ReactNode }) {
    return (
        <div>
            Template Header
            {children}
            Template Footer
        </div>
    );
}