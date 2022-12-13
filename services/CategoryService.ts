import { ICategory, ICategoryPopulated } from "../types/ICategory";
import { $authHost, $host } from "./index";

export default class CategoryService {
  static async getCategoryById(id: string): Promise<ICategoryPopulated> {
    return await $host(`/category/${id}`);
  }

  static async getCategories(type: string): Promise<ICategory[]> {
    return await $host(`/category?type=${type}`);
  }

  static async postCategory(fd: FormData): Promise<ICategory> {
    return await $authHost(`/category`, { body: fd, method: "post" });
  }

  static async removeCategory(id: string): Promise<ICategory> {
    return await $authHost(`/category/${id}`, {
      method: "delete",
    });
  }

  static async updateCategory(id: string, fd: FormData): Promise<ICategory> {
    return await $authHost(`/category/${id}`, {
      method: "put",
      body: fd,
    });
  }
}
