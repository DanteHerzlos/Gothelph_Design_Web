import { IImage } from "./IImage"

export interface IProduct {
  _id?: string;
  title: string;
  long_title: string;
  body: string;
  sizes?: string[];
  price?: string;
  category?: string;
  imgs: IImage[];
  notFound?: boolean
}
