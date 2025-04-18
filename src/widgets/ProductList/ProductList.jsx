import "./ProductList.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "@/shared/ui/Loader/Loader.jsx";

const ProductList = ({ productList, isLoading }) => {
  if (isLoading) {
    return <Loader />;
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
                src={product.images.find((img) => img.is_primary)?.url || product.images[0]?.url}
                alt={product.name}
                onError={(e) => {
                  e.target.src = "/path/to/placeholder-image.jpg";
                }}
              />
              <div className="products__wrapper">
                <div className="products__wrapper-name">
                  <h3 className="products__title">{product.name}</h3>
                </div>
                <div className="products__wrapper-price">{product.price} ₽</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  productList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category_id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          is_primary: PropTypes.bool,
        }),
      ).isRequired,
      sizes: PropTypes.arrayOf(
        PropTypes.shape({
          size: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ProductList;
