// lib/api/admin/blog.ts
import axiosInstance from "../axios-instance";
import { API } from "../endpoints";
export const getAllBlogs = async ({page, limit, search}: {page: number, limit: number, search?: string}) => {
    try {
        const response = await axiosInstance.get(
            API.ADMIN.BLOG.GET,
            {
                params: {
                    page,
                    limit,
                    search
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error?.response?.data?.message || 'Fetch blogs failed');
    }
}

export const getBlogById = async (id: string) => {
    try {
        const response = await axiosInstance.get(API.ADMIN.BLOG.GET_ONE(id));
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error?.response?.data?.message || 'Fetch blog failed');
    }
}

export const createBlog = async (data: any) => {
    try {
        const response = await axiosInstance.post(API.ADMIN.BLOG.CREATE, data);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error?.response?.data?.message || 'Create blog failed');
    }
}

export const updateBlog = async (id: string, data: any) => {
    try {
        const response = await axiosInstance.put(API.ADMIN.BLOG.UPDATE(id), data);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error?.response?.data?.message || 'Update blog failed');
    }
}

export const deleteBlog = async (id: string) => {
    try {
        const response = await axiosInstance.delete(API.ADMIN.BLOG.DELETE(id));
        return response.data;
    } catch (error: Error | any) {
        console.log(error);
        throw new Error(error?.response?.data?.message || 'Delete blog failed');
    }
}