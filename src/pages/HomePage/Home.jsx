import { useEffect } from 'react';
import './Home.scss';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductList from '../../widgets/ProductList/ProductList.jsx';
import Category from '../../features/Category/Category.jsx';
import Header from '../../widgets/Header/Header.jsx';
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
    const productList = useSelector(state => state.products.filtered);
    const isLoading = useSelector(state => state.products.isLoading);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <>
            <Header />
            <section className='home'>
                <div className='home__container'>
                    <div className='home__container-catalog' >
                        <h2 className='home__catalog-title' id="news">Новости</h2>
                        <Category />

                        {isLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '100px 0', height: '100vh' }}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            productList && productList.length > 0 ? (
                                <ProductList productList={productList} isLoading={isLoading} />
                            ) : (
                                <div className='home__catalog-title' style={{ margin: '100px 0' }}>
                                    No products available
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;