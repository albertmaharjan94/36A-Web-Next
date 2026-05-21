export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <div className="border p-2">Example Header</div>
            {children}
            <div className="border p-2">Example Footer</div>
        </section>
    );
}