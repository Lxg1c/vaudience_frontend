import '../../scss/Home.scss';
import Products from "../Products/Products.jsx";
import Poster from "../Poster/Poster.jsx";
import { useSelector} from "react-redux";
import CategoryMenu from "../CategoryMenu/CategoryMenu.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const Home = () => {
    const productList = useSelector(state => state.products.filtered)

    return (
        <>
            <Header/>
            <section className='home'>
                <div className='home__container'>
                    <div className='home__container-poster'>
                        <Poster />
                    </div>

                    <div className='home__container-catalog'>
                        <h2 className='home__catalog-title'>NEWS</h2>
                        <CategoryMenu />
                        {productList && productList.length > 0 ? (
                            <Products productList={productList} />
                        ) : (
                            <div className='home__catalog-title' style={{margin: '100px 0'}}>No products available</div>
                        )}
                    </div>
                </div>
            </section>

        </>
    );
};

export default Home;