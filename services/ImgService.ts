import { $authHost } from ".";
import { IImage } from "../types/IImage";

export default class ImgService {
  static async postImg(fd: FormData): Promise<IImage> {
    return await $authHost(`/img`, { body: fd, method: "post" });
  }
  static async removeImgByProductId(id: String): Promise<IImage> {
    return await $authHost(`/img?product=${id}`, { method: "delete" });
  }
}