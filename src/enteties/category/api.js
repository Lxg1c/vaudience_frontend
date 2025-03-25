import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/category/')
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

