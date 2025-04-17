import axios from "axios";

export const BASE_URL_API = "http://localhost:8000";

export const ROUTES = {
  CART: "/cart",
  LOGIN: "/login",
  REGISTER: "/register",
  PRODUCT: "/products/:id",
  FAVORITE: "/bookmark",
  ABOUT: "/about",
  PROFILE: "/profile",
};

export const api = axios.create({
  baseURL: `${BASE_URL_API}`,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await refreshAccessToken();

                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${BASE_URL_API}/auth/refresh/`);
        return response.data;
    } catch (error) {
        console.error('Failed to refresh token:', error.message);
        throw error;
    }
};