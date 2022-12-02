import { AxiosResponse } from "axios";
import { ICategory } from "../types/ICategory";
import { $authHost, $host } from "./index";

export default class CategoryService {
  static async getCategories(
    type: string
  ): Promise<AxiosResponse<ICategory[]>> {
    return await $host.get(`/category?type=${type}`);
  }
  static async postCategory(fd: FormData): Promise<AxiosResponse<ICategory>> {
    return await $authHost.post(`/category`, fd);
  }
  static async removeCategory(id: string) {
    return await $authHost.delete(`/category/${id}`);
  }
  static async updateCategory(id: string, fd: FormData) {
    return await $authHost.put(`/category/edit/${id}`, fd);
  }
}
