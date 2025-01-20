import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories')
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

