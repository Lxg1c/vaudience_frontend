import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_API } from "../Const/Const.js";

export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL_API}/register/`, userData);
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);