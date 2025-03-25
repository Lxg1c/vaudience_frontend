import './ProductList.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getProducts } from "../../app/store/thunks/productsThunk.js";

const ProductList = ({ productList, isLoading }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const products = useSelector(state => state.products).list;
    console.log(products);


    if (isLoading) {
        return (
            <div className="preloader-wrapper active">
                <div className="spinner-layer spinner-red-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!productList || productList.length === 0) {
        return <div className="no-products">Товары не найдены</div>;
    }

    return (
        <div className="products">
            <div className="products__container container">
                {products.map((product) => (
                    <Link to={`/products/${product.id}`} key={product.id} className="product__link">
                        <div className="products__item">
                            <img
                                className="products__img"
                                src={product.category.images[0]}
                                alt={product.name}
                            />
                            <div className="products__wrapper">
                                <div className="products__wrapper-name">
                                    <h3 className='products__title'>{product.name}</h3>
                                </div>
                                <div className="products__wrapper-price">
                                    {`${product.price} ${product.price.slice(1)}`} ₽
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

ProductList.propTypes = {
    product: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            category: PropTypes.shape({
                image: PropTypes.string.isRequired,
            }).isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default ProductList;