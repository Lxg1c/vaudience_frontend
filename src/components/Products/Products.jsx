import '../../scss/Products.scss';
import { Link } from 'react-router-dom';
import { Pagination } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useState } from 'react';
import {useDispatch} from "react-redux";
import {getProducts} from "../../thunks/productsThunk.js";

const Products = ({ productList, isLoading }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    // Вычисляем индексы для отображения продуктов на текущей странице
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);

    // Вычисляем количество страниц
    const paginationLength = 10;
    const paginationItems = Array.from({ length: paginationLength }, (_, index) => index + 1);

    // Обработчик изменения страницы
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(getProducts({ offset: (pageNumber - 1) * itemsPerPage, limit: itemsPerPage }));
    };

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
                    <Pagination size='lg' className='mb-3'>
                        <Pagination.Prev
                            onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                            disabled={currentPage === 1}
                        />
                        {paginationItems.map((page) => (
                            <Pagination.Item
                                key={page}
                                active={page === currentPage}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => setCurrentPage((prev) => (prev < paginationLength ? prev + 1 : prev))}
                            disabled={currentPage === paginationLength}
                        />
                    </Pagination>
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