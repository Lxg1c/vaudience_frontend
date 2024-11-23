import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productReducer.js";
import categoryReducer from "../reducers/categoryReducer.js";
import { productApi } from "../api.js";

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productReducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
    devTools: true,
});