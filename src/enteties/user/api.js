import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL_API} from "../../shared/lib/const.js";
import qs from "qs";


export const registerUser = createAsyncThunk(
    'users/createUser',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL_API}/api/v1/users/register`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (payload, rememberMe, thunkAPI) => {
        try {
            // Преобразуем payload в x-www-form-urlencoded строку
            const formEncodedData = qs.stringify(payload);

            const response = await axios.post(
                `${BASE_URL_API}/api/v1/users/login/`,
                formEncodedData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded", // Указываем нужный формат
                    },
                }
            );

            if (rememberMe) {
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
            } else {
                sessionStorage.setItem("access_token", response.data.access_token);
            }

            return response.data;
        } catch (error) {
            console.error("Ошибка авторизации:", error.response?.data || error);
            return thunkAPI.rejectWithValue(error.response?.data || "Ошибка сервера");
        }
    }
);

export const aboutUser = createAsyncThunk(
    'users/aboutUser',
    async (_, thunkAPI) => {
        try {
            // Пытаемся получить данные о пользователе с текущим access token
            let token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');

            if (!token) {
                console.error("Токен отсутствует")
                return
            }

            const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                try {
                    // Пытаемся обновить токен
                    const newToken = await thunkAPI.dispatch(refreshToken()).unwrap();

                    // Сохраняем новый токен в зависимости от исходного хранилища
                    if (localStorage.getItem('access_token')) {
                        localStorage.setItem('access_token', newToken);
                    } else {
                        sessionStorage.setItem('access_token', newToken);
                    }

                    // Повторяем запрос с новым токеном
                    const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${newToken}`,
                        },
                    });

                    return response.data;
                } catch (refreshError) {
                    // Если refresh token также истек, перенаправляем на страницу авторизации
                    if (refreshError.response?.status === 401) {
                        window.location.href = '/login';
                    }
                    return thunkAPI.rejectWithValue(refreshError.response?.data || refreshError.message);
                }
            }
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
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
