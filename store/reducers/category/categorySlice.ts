import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "types/ICategory";

interface CategoryState {
  categories: ICategory[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
    addCategory(state, action: PayloadAction<ICategory>) {
      state.categories.push(action.payload);
    },
    updateCategory(state, action: PayloadAction<ICategory>) {
      state.categories = state.categories.map((category) =>
        category._id === action.payload._id ? action.payload : category
      );
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
});

export const { setCategory, addCategory, updateCategory, removeCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
