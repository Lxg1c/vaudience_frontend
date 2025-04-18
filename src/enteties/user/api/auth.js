import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_API } from "../../../shared/lib/const.js";
import qs from "qs";

//
// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
//

const getAccessToken = () =>
  localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

const getRefreshToken = () =>
  localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");

const setAccessToken = (token) => {
  if (localStorage.getItem("access_token")) {
    localStorage.setItem("access_token", token);
  } else {
    sessionStorage.setItem("access_token", token);
  }
};

const setTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

const setTokensSessionStorage = (access, refresh) => {
  sessionStorage.setItem("access_token", access);
  sessionStorage.setItem("refresh_token", refresh);
};

const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
};

const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

//
// === THUNKS ===
//

export const registerUser = createAsyncThunk("users/createUser", async (payload, thunkAPI) => {
  try {
    const formData = qs.stringify(payload);

    const response = await axios.post(`${BASE_URL_API}/api/v1/users/register`, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const loginUser = createAsyncThunk("users/loginUser", async (payload, thunkAPI) => {
  try {
    const { rememberMe, ...loginData } = payload;
    const formEncodedData = qs.stringify(loginData);

    const response = await axios.post(`${BASE_URL_API}/api/v1/users/login/`, formEncodedData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token, refresh_token } = response.data;

    if (rememberMe) {
      setTokens(access_token, refresh_token);
    } else {
      setTokensSessionStorage(access_token, refresh_token);
    }

    return response.data;
  } catch (error) {
    console.error("Ошибка авторизации:", error.response?.data || error);
    return thunkAPI.rejectWithValue(error.response?.data || "Ошибка сервера");
  }
});

export const refreshToken = createAsyncThunk("auth/useRefreshToken", async (_, thunkAPI) => {
  try {
    const refresh = getRefreshToken();

    const response = await axios.post(`${BASE_URL_API}/api/v1/users/refresh/`, {
      refreshToken: refresh,
    });

    const { access_token } = response.data;
    localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const aboutUser = createAsyncThunk("users/aboutUser", async (_, thunkAPI) => {
  let token = getAccessToken();

  if (!token) {
    return thunkAPI.rejectWithValue("Токен отсутствует");
  }

  try {
    const response = await axios.get(`${BASE_URL_API}/api/v1/users/me/`, authHeader(token));
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const errorDetail = error.response?.data?.detail;

    // Если access токен истёк
    if (status === 401 || errorDetail?.includes("Signature has expired")) {
      try {
        // Обновляем токен
        const newToken = await thunkAPI.dispatch(refreshToken()).unwrap();
        setAccessToken(newToken);

        // Повторный запрос с новым токеном
        const retryResponse = await axios.get(
          `${BASE_URL_API}/api/v1/users/me/`,
          authHeader(newToken),
        );
        return retryResponse.data;
      } catch (refreshError) {
        // Если refresh тоже невалиден — разлогиниваем
        if (refreshError.response?.status === 401) {
          clearTokens();
          window.location.href = "/login";
        }
        return thunkAPI.rejectWithValue(refreshError.response?.data || refreshError.message);
      }
    }

    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});
