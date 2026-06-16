export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="p-2 border">
            Layout Header
            {children}
            Layout Footer
        </section>
    );
}