import PropTypes from 'prop-types';
import '../../styles/Products.scss'
import { Link } from "react-router-dom";

const Products = ({ productList }) => {
    if (!productList || productList.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div className="products">
            <div className="products__container container">
                {productList.map((product) => (
                    <Link to={`/products/${product.id}`} key={product.id} className='product__link'>
                        <div className='products__item'>
                            <img className='products__img' src={product.image_url} alt={product.name} />
                            <div className='products__wrapper'>
                                <div className='products__wrapper-name'>
                                    <h3>{product.product_name}</h3>
                                </div>
                                {/*<div className='products__wrapper-del_time'>*/}
                                {/*    {product.del_time === "Предзаказ" ? "Предзаказ" : `Отправка: ${product.del_time} дней`}*/}
                                {/*</div>*/}
                                <div className='products__wrapper-price'>
                                    {product.product_price} ₽
                                </div>
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
            img: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            del_time: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            price: PropTypes.string.isRequired, // Исправлено на number
        })
    ).isRequired,
};

export default Products;