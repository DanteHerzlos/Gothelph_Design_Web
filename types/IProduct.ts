import { IImage } from "./IImage"

export interface IProductBase {
  _id?: string
  title: string
  long_title: string
  body: string
  sizes?: string[]
  price?: string
  category?: string
}

export interface IProduct extends IProductBase {
  imgs: IImage[]
}

export interface IProductDB extends IProductBase {
  imgs: string[];
}