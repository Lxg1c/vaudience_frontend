import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {BASE_URL_API} from "./Const/Const.js";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: ( {id}) => `/products/${id}`,
        }),
    }),
});

export const { useGetProductQuery } = productApi;