import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/category/categorySlice";
import productReducer from "./reducers/product/productSlice";


const rootReducer = combineReducers({
  categoryReducer,
  productReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
