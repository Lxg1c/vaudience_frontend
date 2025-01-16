import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/users/', payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', payload)
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const aboutUser = createAsyncThunk(
    'users/aboutUser',
    async (_, thunkAPI) => {
        try {
            // Пытаемся получить данные о пользователе с текущим access token
            const token = localStorage.getItem('access_token');
            const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            if (error.response.status === 401) {
                console.log("Ошибка 401")
                try {
                    const newToken = await thunkAPI.dispatch(refreshToken()).unwrap();
                    localStorage.setItem('access_token', newToken);

                    // Повторяем запрос с новым токеном
                    const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${newToken}`,
                        },
                    });
                    return response.data;
                } catch (refreshError) {
                    // Если refresh token также истек, перенаправляем на страницу авторизации
                    // if (refreshError.response.status === 401) {
                    //     window.location.href = '/login';
                    return thunkAPI.rejectWithValue(refreshError.response.data);
                }
            }
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, thunkAPI) => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/refresh-token', { refreshToken });
            localStorage.setItem('access_token', response.data.access_token);
            return response.data.token;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
