// app/admin/blogs/_components/BlogTable.tsx
"use client";
import DeleteModal from "@/app/_components/DeleteModal";
import { handleDeleteBlog } from "@/lib/actions/admin/blog-action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function BlogTable(
    { blogs, pagination, search }:
        { blogs: any[]; pagination: any; search: string }
) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(search);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/admin/blogs?search=${searchTerm}`);
    }

    const [deleteId, setDeleteId] = useState(null);

    const onnDelete = async () => {
        try {
            await handleDeleteBlog(deleteId!);
            toast.success("Blog deleted successfully");
        } catch (err: Error | any) {
            toast.error(err.message || "Failed to delete blog");
        } finally {
            setDeleteId(null);
        }
    }

    return (
        <div className="space-y-6">
            <DeleteModal
                isOpen={deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={onnDelete}
                title="Delete Confirmation"
                description="Are you sure you want to delete this item? This action cannot be undone."
            />

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center gap-3 mt-2">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        className="w-full px-4 py-1 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search blogs by title..."
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                >
                    Search
                </button>
                {/* limit selector */}
                <select
                    value={pagination?.limit || 10}
                    onChange={(e) => router.push(`/admin/blogs?search=${search}&limit=${e.target.value}`)}
                    className="px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </form>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-1 text-left text-sm font-semibold">ID</th>
                            <th className="px-6 py-1 text-left text-sm font-semibold">Title</th>
                            <th className="px-6 py-1 text-left text-sm font-semibold">Author</th>
                            <th className="px-6 py-1 text-right text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <tr
                                    key={blog._id}
                                    className="transition-colors"
                                >
                                    <td className="px-6 py-1 text-sm font-mono">
                                        {blog._id}
                                    </td>
                                    <td className="px-6 py-1 text-sm font-medium">
                                        {blog.title}
                                    </td>
                                    <td className="px-6 py-1 text-sm font-medium">
                                        {blog.authorId.firstName} {blog.authorId.lastName}
                                    </td>
                                    <td className="px-6 py-1 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/blogs/${blog._id}`}
                                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 rounded-md transition-colors"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/admin/blogs/${blog._id}/edit`}
                                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-amber-600 rounded-md transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeleteId(blog._id)}
                                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 rounded-md transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center">
                                    No blogs found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        Page <span className="font-semibold">{pagination.page}</span> of{' '}
                        <span className="font-semibold">{pagination.totalPages}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {pagination.page > 1 && (
                            <Link
                                className="px-4 py-2 rounded-lg border border-gray-300 font-medium transition-colors"
                                href={`/admin/blogs?page=${pagination.page - 1}&limit=${pagination.limit}&search=${search}`}
                            >
                                Previous
                            </Link>
                        )}
                        {pagination.page < pagination.totalPages && (
                            <Link
                                className="px-4 py-2 rounded-lg border border-gray-300 font-medium transition-colors"
                                href={`/admin/blogs?page=${pagination.page + 1}&limit=${pagination.limit}&search=${search}`}
                            >
                                Next
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}