import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice.js";
import categoryReducer from "./slices/categorySlice.js";
import userReducer from "./slices/userSlice.js";
import { getProductById } from "../../enteties/product/index.js";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    user: userReducer,
    [getProductById.reducerPath]: getProductById.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getProductById.middleware),
  devTools: true,
});
