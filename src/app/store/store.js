import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice.js";
import categoryReducer from "./slices/categorySlice.js";
import userReducer from "./slices/userSlice.js";



export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productReducer,
        user: userReducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
    devTools: true,
});