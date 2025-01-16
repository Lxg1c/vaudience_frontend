import PropTypes from 'prop-types';
import '../../scss/Products.scss';
import { Link } from 'react-router-dom';

const Products = ({ productList, isLoading}) => {
    // Если данные загружаются, показываем прелоадер
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
                {productList.map((product) => (
                    <Link to={`/products/${product.id}`} key={product.id} className="product__link">
                        <div className="products__item">
                            <img
                                className="products__img"
                                src={product.image}
                                alt={product.title}
                                style={{ maxWidth: '150px' }}
                            />
                            <div className="products__wrapper">
                                <div className="products__wrapper-name">
                                    <h3>{product.title}</h3>
                                </div>
                                <div className="products__wrapper-price">{product.price * 100} ₽</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

Products.propTypes = {
    productList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool,
};


export default Products;