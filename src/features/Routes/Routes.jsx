import { Routes, Route } from "react-router-dom";
import Home from "../../pages/HomePage/Home.jsx";
import Cart from "../../pages/CartPage/Cart.jsx";
import Registration from "../../pages/RegistrationPage/Registration.jsx";
import Login from "../../pages/LoginPage/Login.jsx";
import { ROUTES } from "../../shared/lib/const.js";
import ProductCard from "../ProductCard/ProductCard.jsx";
import Favorite from "../../pages/FavoriteProductPage/Favorite.jsx";

const AppRoutes = () => {
    return (
        <Routes future={{ v7_startTransition: true }}>
            <Route index element={<Home />} />

            <Route path={ROUTES.CART} element={<Cart />} />

            <Route path={ROUTES.LOGIN} element={<Login />} />

            <Route path={ROUTES.REGISTER} element={<Registration />} />

            <Route path={ROUTES.PRODUCT} element={<ProductCard />} />

            <Route path={ROUTES.FAVORITE} element={<Favorite />} />
        </Routes>
    );
}

export default AppRoutes;