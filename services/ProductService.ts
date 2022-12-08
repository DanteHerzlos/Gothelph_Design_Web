import { IProduct } from "../types/IProduct";
import { $authHost, $host } from "./index";

export default class ProductService {
  static async getProductById(id: string): Promise<IProduct> {
    return await $host(`/product/${id}`);
  }
  static async getProductsByCategory(category: string): Promise<IProduct[]> {
    return await $host(`/product?category=${category}`);
  }
  static async postProduct(fd: FormData): Promise<IProduct> {
    return await $authHost(`/product`, { method: "post", body: fd });
  }
  static async removeProduct(id: string) {
    return await $authHost(`/product/${id}`, { method: "delete" });
  }
  static async updateProduct(id: string, fd: FormData) {
    return await $authHost(`/product/${id}`, { method: "put", body: fd });
  }
}