import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_API } from "../Const/Const.js";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL_API}/products`);
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
