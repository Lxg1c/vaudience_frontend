import { configureStore } from "@reduxjs/toolkit";
import { productReducer, productApi } from "@/enteties/product";
import { categoryReducer } from "@/enteties/category";
import { userReducer } from "@/enteties/user";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    user: userReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
  devTools: true,
});
