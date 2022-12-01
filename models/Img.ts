import mongoose, { Schema } from "mongoose";

const ImgSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  position: {
    // Img position
    type: Number,
  },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

export default mongoose.models.Img || mongoose.model("Img", ImgSchema);
