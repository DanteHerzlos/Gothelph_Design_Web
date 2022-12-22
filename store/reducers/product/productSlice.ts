import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/IProduct";

export interface productState {
  products: IProduct[];
}

const initialState: productState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<IProduct>) {
      state.products.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<IProduct>) {
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const { setProduct, addProduct, updateProduct, removeProduct } =
  productSlice.actions;

export default productSlice.reducer;
