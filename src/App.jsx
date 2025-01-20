import './scss/App.scss';
import AppRoutes from "./components/Routes/Routes.jsx";
import { useDispatch } from "react-redux";
import { getCategories } from "./thunks/categoryThunk.js";
import { getProducts } from "./thunks/productsThunk.js";
import { useEffect } from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts({ offset: 0, limit: 18 }));
    }, [dispatch])

    return (
        <div className='app'>
            <Header />
            <AppRoutes/>
            <Footer />
        </div>
    );
}

export default App;