import { IProduct } from "./IProduct"

export interface ICategory {
  _id?: string
  type: string
  title: string
  body?: string
  url_img: string
}

export interface ICategoryPopulated extends ICategory {
  products: IProduct[];
  notFound?: boolean
}