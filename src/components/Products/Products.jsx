import '../../scss/Products.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getProducts } from "../../thunks/productsThunk.js";
import PagePagination from "../PagePagination/PagePagination.jsx"

const Products = ({ productList, isLoading }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = 6;

    const handlePageChange = async (pageNumber) => {
        console.log("Page changed to:", pageNumber);
        setCurrentPage(pageNumber);
        dispatch(getProducts({ offset: (pageNumber - 1) * itemsPerPage, limit: itemsPerPage })); // Затем выполняем запрос
    };

    useEffect(() => {
        console.log("Current page updated:", currentPage);
    }, [currentPage]);

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
                {currentItems.map((product) => (
                    <Link to={`/products/${product.id}`} key={product.id} className="product__link">
                        <div className="products__item">
                            <img
                                className="products__img"
                                src={product.category.image}
                                alt={product.title}
                            />
                            <div className="products__wrapper">
                                <div className="products__wrapper-name">
                                    <h3 className='products__title'>{product.title}</h3>
                                </div>
                                <div className="products__wrapper-price">{product.price * 100} ₽</div>
                            </div>
                        </div>
                    </Link>
                ))}
                <div className='products__pagination'>
                    <PagePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Products.propTypes = {
    productList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            category: PropTypes.shape({
                image: PropTypes.string.isRequired,
            }).isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default Products;