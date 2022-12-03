import { AxiosResponse } from "axios";
import { IProduct } from "../types/IProduct";
import { $authHost, $host } from "./index";

export default class ProductService {
  static async getProductsByCategory(
    category: string
  ): Promise<AxiosResponse<IProduct[]>> {
    return await $host.get(`/product?category=${category}`);
  }
  static async postProduct(fd: FormData): Promise<AxiosResponse<IProduct>> {
    return await $authHost.post(`/product`, fd);
  }
  static async removeProduct(id: string) {
    return await $authHost.delete(`/product/${id}`);
  }
  static async updateProduct(id: string, fd: FormData) {
    return await $authHost.put(`/product/edit/${id}`, fd);
  }
}
