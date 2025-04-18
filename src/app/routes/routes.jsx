import { Routes, Route } from "react-router-dom";
import Product from "@/pages/ProductPage/Product.jsx";
import Cart from "@/pages/CartPage/Cart.jsx";
import Auth from "@/pages/AuthPage/Auth.jsx";
import { ROUTES } from "@/shared/lib/const.js";
import ProductCard from "@/features/ProductCard/ProductCard.jsx";
import Favorite from "@/pages/FavoritePage/Favorite.jsx";
import About from "@/pages/AboutPage/About.jsx";
import Profile from "@/pages/ProfilePage/Profile.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Product />} />

      <Route path={ROUTES.CART} element={<Cart />} />

      <Route path={ROUTES.LOGIN} element={<Auth />} />

      <Route path={ROUTES.PRODUCT} element={<ProductCard />} />

      <Route path={ROUTES.FAVORITE} element={<Favorite />} />

      <Route path={ROUTES.ABOUT} element={<About />} />

      <Route path={ROUTES.PROFILE} element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
