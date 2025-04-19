import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL_API } from "@/shared/lib/index.js";
import axios from "axios";

export const getFavorites = createAsyncThunk("favorite/getFavorites", async (user_id, thunkAPI) => {
    try {
        const response = await axios.get(`${BASE_URL_API}/api/v1/favorite/?user_id=${user_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const addToFavorite = createAsyncThunk("favorite/addToFavorite", async ({ user_id, product_id }, thunkAPI) => {
    try {
        const response = await axios.post(`${BASE_URL_API}/api/v1/favorite/?user_id=${user_id}`, { product_id });
        return response.data;
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const removeFromFavorite = createAsyncThunk("favorite/removeFromFavorite", async ({ user_id, product_id }, thunkAPI) => {
    try {
        const response = await axios.delete(`${BASE_URL_API}/api/v1/favorite/?user_id=${user_id}&product_id=${product_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error.message);
    }
});
