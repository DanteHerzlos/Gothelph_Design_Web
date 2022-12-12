import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: {
    // Category title
    type: String,
    required: [true, "Please provide a name of the category."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  body: {
    // Category description
    type: String,
  },
  type: {
    // Product type
    type: String,
  },
  url_img: {
    // Long product title
    type: String,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
