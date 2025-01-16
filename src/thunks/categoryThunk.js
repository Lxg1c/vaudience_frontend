import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL_API} from "../Const/Const.js";

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL_API}/products/categories`)
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

