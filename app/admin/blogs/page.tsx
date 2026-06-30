// app/admin/blogs/page.tsx
import { handleGetAllBlogs } from "@/lib/actions/admin/blog-action";
import BlogTable from "./_components/BlogTable";
export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // get the search params
    const query = await searchParams;
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const limit = query.limit ? parseInt(query.limit as string, 10) : 10;
    const search = query.search ? (query.search as string) : '';
    console.log("Search params:", { page, limit, search });
    // call action to get all blogs with the search params
    const result = await handleGetAllBlogs({ page, limit, search });

    if (!result.success) {
        throw new Error("Failed to load blogs");
    }

    return (
        <div>
            <BlogTable blogs={result.data} pagination={result.pagination} search={search} />
        </div>
    );
}