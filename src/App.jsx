import './styles/App.scss';
import AppRoutes from "./components/Routes/Routes.jsx";
import { useDispatch } from "react-redux";
import { getCategories } from "./thunks/categoryThunk.js";
import { getProducts } from "./thunks/productsThunk.js";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div className='app'>
            <AppRoutes/>
        </div>
    );
}

export default App;