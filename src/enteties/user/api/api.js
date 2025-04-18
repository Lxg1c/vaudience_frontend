import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_API } from "@/shared/lib/const.js";

export const saveNewUserData = createAsyncThunk(
  "users/setUserData",
  async ({ userId, userData }, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL_API}/api/v1/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
