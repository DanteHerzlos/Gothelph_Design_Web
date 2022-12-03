import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/IProduct";

interface productState {
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
    removeProduct(state, action: PayloadAction<string>) {
      state.products.filter((product) => product._id !== action.payload);
    },
  },
});

export const { setProduct, addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
