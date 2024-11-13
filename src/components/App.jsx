import '../styles/App.scss';
import AppRoutes from "../Routes/Routes.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

function App() {
    return (
        <div className='app'>
            <Header />
            <AppRoutes />
            <Footer />
        </div>
    );
}

export default App;