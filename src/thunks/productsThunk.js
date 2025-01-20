import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get(
                `https://api.escuelajs.co/api/v1/products?offset=${payload.offset}&limit=${payload.limit}`
            );
            return response.data;
        } catch (error) {
            console.log(error, payload);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
