import { configureStore } from "@reduxjs/toolkit";
import { productReducer, productApi } from "@/enteties/product";
import { categoryReducer } from "@/enteties/category";
import { userReducer } from "@/enteties/user";
import { cartReducer } from "@/enteties/cart/index.js";
import { favoriteReducer } from "@/enteties/favorite/index.js";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
  devTools: true,
});
