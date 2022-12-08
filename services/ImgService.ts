import { $authHost, $host } from ".";
import { IImage } from "../types/IImage";

export default class ImgService {
  static async getImgs(type: string): Promise<IImage[]> {
    return await $host(`/img?type=${type}`);
  }
  static async postImg(fd: FormData): Promise<IImage> {
    return await $authHost(`/img`, { body: fd, method: "post" });
  }
  static async removeImgByProductId(id: String): Promise<IImage> {
    return await $authHost(`/img?product=${id}`, { method: "delete" });
  }
}