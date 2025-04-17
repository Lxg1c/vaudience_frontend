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
