import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../../types/ICategory";

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
    removeCategory(state, action: PayloadAction<string>) {
      state.categories.filter((category) => category._id !== action.payload);
    },
  },
});

export const { setCategory, addCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
