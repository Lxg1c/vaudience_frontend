import "./App.scss";
import AppRoutes from "./routes/routes.jsx";
import { useDispatch } from "react-redux";
import { getCategories } from "@/enteties/category/api/api.js";
import { useEffect } from "react";
import Header from "@/widgets/Header/Header.jsx";
import Footer from "@/widgets/Footer/Footer.jsx";
import { getProducts } from "@/enteties/product/api/api.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
