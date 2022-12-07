import mongoose from "mongoose";
import { IProduct } from "../types/IProduct";

const ProductSchema = new mongoose.Schema<IProduct>({
  title: {
    // Short product title
    type: String,
    required: [true, "Please provide a name of the product."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  long_title: {
    // Long product title
    type: String,
  },
  body: {
    // Description product
    type: String,
  },
  sizes: {
    // List of sizes
    type: Array,
  },
  price: {
    // Price of product
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  imgs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Img" }],
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
