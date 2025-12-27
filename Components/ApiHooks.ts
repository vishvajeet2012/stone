import { IProduct } from "@/model/product";
import { ICategory } from "@/model/category";
import { IProject } from "@/model/project";
import axios from "axios";

const API_BASE = "/api";

export const api = {
  products: {
    getAll: async () => {
      const { data } = await axios.get<{ success: boolean; data: IProduct[] }>(`${API_BASE}/products`);
      return data.data;
    },
    getOne: async (slug: string) => {
      const { data } = await axios.get<{ success: boolean; data: IProduct }>(`${API_BASE}/products/${slug}`);
      return data.data;
    },
    create: async (dataBody: any) => {
      const { data } = await axios.post<{ success: boolean; data: IProduct }>(`${API_BASE}/products`, dataBody);
      return data.data;
    },
    update: async (slug: string, dataBody: any) => {
      const { data } = await axios.put<{ success: boolean; data: IProduct }>(`${API_BASE}/products/${slug}`, dataBody);
      return data.data;
    },
    delete: async (slug: string) => {
      const { data } = await axios.delete<{ success: boolean }>(`${API_BASE}/products/${slug}`);
      return data.success;
    }
  },

  categories: {
    getAll: async () => {
      const { data } = await axios.get<{ success: boolean; data: ICategory[] }>(`${API_BASE}/categories`);
      return data.data;
    },
    getOne: async (slug: string) => {
      const { data } = await axios.get<{ success: boolean; data: ICategory }>(`${API_BASE}/categories/${slug}`);
      return data.data;
    },
    create: async (dataBody: any) => {
      const { data } = await axios.post<{ success: boolean; data: ICategory }>(`${API_BASE}/categories`, dataBody);
      return data.data;
    },
    update: async (slug: string, dataBody: any) => {
      const { data } = await axios.put<{ success: boolean; data: ICategory }>(`${API_BASE}/categories/${slug}`, dataBody);
      return data.data;
    },
    delete: async (slug: string) => {
      const { data } = await axios.delete<{ success: boolean }>(`${API_BASE}/categories/${slug}`);
      return data.success;
    }
  },

  projects: {
    getAll: async () => {
      const { data } = await axios.get<{ success: boolean; data: IProject[] }>(`${API_BASE}/projects`);
      return data.data;
    },
    getOne: async (slug: string) => {
        const { data } = await axios.get<{ success: boolean; data: IProject }>(`${API_BASE}/projects/${slug}`);
        return data.data;
    },
    create: async (formData: FormData) => {
      const { data } = await axios.post<{ success: boolean; data: IProject }>(`${API_BASE}/projects`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    },
    update: async (slug: string, formData: FormData) => {
      const { data } = await axios.put<{ success: boolean; data: IProject }>(`${API_BASE}/projects/${slug}`, formData, {
         headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    },
    delete: async (slug: string) => {
      const { data } = await axios.delete<{ success: boolean }>(`${API_BASE}/projects/${slug}`);
      return data.success;
    }
  }
};
