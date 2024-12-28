import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_API } from "../Const/Const.js";
import Cookies from 'js-cookie';
import {api} from "../Const/Const.js";

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL_API}/auth/register/`, payload);
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL_API}/auth/login/`, payload)
            Cookies.set('users_access_token', response.data.access_token, { expires: 7 });
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const aboutUser = createAsyncThunk(
    'users/aboutUser',
    async (_, thunkAPI) => {
        try {
            const token = Cookies.get('users_access_token');
            if (!token) {
                throw new Error('Token not found');
            }
            const response = await api.get(`/auth/me/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);