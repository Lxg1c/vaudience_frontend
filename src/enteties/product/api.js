import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {BASE_URL_API} from "../../shared/lib/const.js";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/product/`
            );
            return response.data;
        } catch (error) {
            console.log(error, payload);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const getProductById = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: ( {id}) => `/product/${id}`,
        }),
    }),
});

export const { useGetProductQuery} = getProductById;