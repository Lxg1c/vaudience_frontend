import { Routes, Route } from "react-router-dom";
import Home from "../../pages/HomePage/Home.jsx";
import Cart from "../../pages/CartPage/Cart.jsx";
import Auth from "../../pages/AuthPage/Auth.jsx";
import { ROUTES } from "../../shared/lib/const.js";
import ProductCard from "../ProductCard/ProductCard.jsx";
import Favorite from "../../pages/FavoriteProductPage/Favorite.jsx";
import About from "../../pages/AboutPage/About.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />} />

            <Route path={ROUTES.CART} element={<Cart />} />

            <Route path={ROUTES.LOGIN} element={<Auth />} />

            <Route path={ROUTES.PRODUCT} element={<ProductCard />} />

            <Route path={ROUTES.FAVORITE} element={<Favorite />} />

            <Route path={ROUTES.ABOUT} element={<About />} />
        </Routes>
    );
}

export default AppRoutes;