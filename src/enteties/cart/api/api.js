import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL_API } from "@/shared/lib/index.js";
import axios from "axios";

export const getUserCart = createAsyncThunk("users/getUserCart", async ({ id }, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/api/v1/cart/?user_id=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const changeItemQuantity = createAsyncThunk(
  "users/changeItemQuantity",
  async ({ user_id, product_id, quantity }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL_API}/api/v1/cart/?product_id=${product_id}&user_id=${user_id}`,
        { quantity },
      );
      return { user_id, product_id, quantity: response.data.quantity };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addProductToCart = createAsyncThunk(
  "products/addToCart",
  async ({ id, productData }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL_API}/api/v1/cart?user_id=${id}`, productData);
      return response.data;
    } catch (error) {
      console.log(error, productData);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteProductFromCart = createAsyncThunk(
  "users/deleteProductFromCart",
  async ({ product_id, user_id, size }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL_API}/api/v1/cart/?product_id=${product_id}&user_id=${user_id}&size=${size}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
