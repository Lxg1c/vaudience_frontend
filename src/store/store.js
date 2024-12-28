import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productReducer.js";
import categoryReducer from "../reducers/categoryReducer.js";
import { productApi } from "../api.js";
import userReducer from "../reducers/userReducer.js";

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