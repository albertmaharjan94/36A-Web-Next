export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    // call api to get 1 blog
    return (
        <div>
            Blog ID: {id}
        </div>
    );
}