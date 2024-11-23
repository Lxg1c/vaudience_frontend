import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home.jsx";
import Cart from "../Bash/Cart.jsx";
import Registration from "../Registration/Registration.jsx";
import Login from "../Login/Login.jsx";
import { ROUTES } from "../../Const/Const.js";
import ProductCard from "../Products/ProductCard.jsx";

const AppRoutes = () => {
    return (
        <Routes future={{ v7_startTransition: true }}>
            <Route index element={<Home />} />

            <Route path={ROUTES.CART} element={<Cart />} />

            <Route path={ROUTES.LOGIN} element={<Login />} />

            <Route path={ROUTES.REGISTER} element={<Registration />} />

            <Route path={ROUTES.PRODUCT} element={<ProductCard />} />
        </Routes>
    );
}

export default AppRoutes;