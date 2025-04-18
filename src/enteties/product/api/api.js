import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_API } from "@/shared/lib/index.js";

export const getProducts = createAsyncThunk("products/getProducts", async (payload, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/api/v1/product/`);
    return response.data;
  } catch (error) {
    console.log(error, payload);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getProductById = createAsyncThunk("products/getProductById", async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/api/v1/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
