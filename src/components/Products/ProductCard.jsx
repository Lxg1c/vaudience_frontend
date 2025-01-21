import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../js/api.js";
import '../../scss/ProductCard.scss';
import backArrow from '../../assets/backArrow.svg';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../reducers/userReducer.js";
import { Carousel, Spinner } from "react-bootstrap";
import '../../scss/Btns.scss';
import { addItemToFavorite, removeItemFromFavorite } from "../../reducers/userReducer.js";

const SIZES = [4, 5, 8, 12];

const ProductCard = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [productCount, setProductCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const { data, error, isLoading } = useGetProductQuery({ id });
    const { currentUser, favorite } = useSelector(({ user }) => user);
    const [isFavorite, setIsFavorite] = useState(false);

    // Проверка, находится ли товар в избранном
    useEffect(() => {
        if (data && favorite) {
            const isProductInFavorite = favorite.some(
                (item) => item.id === data.id && item.size === selectedSize
            );
            setIsFavorite(isProductInFavorite);
        }
    }, [data, favorite, selectedSize]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClick = () => {
        if (!currentUser) navigate('/login');
        else handleAddToCart();
    };

    if (isLoading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '100vh' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
    if (error) return <div>Error: {error.message || 'Something went wrong'}</div>;
    if (!data) return <div>No product found</div>;

    const handleGoBack = () => navigate(-1);
    const handleAddCount = () => setProductCount(prevCount => prevCount + 1);
    const handleRemoveCount = () => setProductCount(prevCount => Math.max(prevCount - 1, 1));
    const handleAddToCart = () => {
        if (selectedSize) {
            dispatch(addItemToCart({ ...data, quantity: productCount, size: selectedSize }));
        } else {
            console.log("Choose a size");
        }
    };

    const handleChangeSize = (size) => {
        setSelectedSize(size);
    };

    const toggleFavorite = () => {
        if (currentUser) {
            if (isFavorite) {
                // Удаляем товар из избранного
                dispatch(removeItemFromFavorite({ id: data.id, size: selectedSize }));
            } else {
                // Добавляем товар в избранное
                dispatch(addItemToFavorite({ ...data, size: selectedSize }));
            }
            setIsFavorite(!isFavorite); // Обновляем состояние
        } else {
            navigate('/login');
        }
    };

    const images = [data.category.image].concat(data.images);
    return (
        <div className="productCard">
            <div className='productCard__container container'>
                <div className='productCard__container-main'>
                    <Carousel>
                        {images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img className='productCard__image' src={image} alt='product-image' />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className='productCard__info'>
                        <h2 className='productCard__info-title'>{data.title}</h2>
                        <h2 className='productCard__info-price'>{data.price * 100} ₽</h2>

                        <p className='productCard__info-size'>
                            Размер
                        </p>
                        <ul className="productCard__info-size--list">
                            {SIZES.map((size) => (
                                <li key={size}>
                                    <button onClick={() => handleChangeSize(size)}
                                            className={`button productCard__info-size--btn btn-reset  ${selectedSize === size ? 'selected' : ''}`}>
                                        {size}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginTop: '20px' }}>
                            <div className='productCard__info-count'>
                                <div className='productCard__info-count--minus btn-reset'
                                     onClick={handleRemoveCount}>-
                                </div>
                                <span>{productCount}</span>
                                <div className='productCard__info-count--plus btn-reset' onClick={handleAddCount}>+
                                </div>
                            </div>

                            <div className='productCard__info-buy'>
                                <button
                                    className='productCard__info-buy--btn btn-reset'
                                    onClick={handleClick}>
                                    В корзину
                                </button>
                                <button className='btn-reset productCard__info-favorite' onClick={toggleFavorite}>
                                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                         className={`${isFavorite ? 'favorite' : 'not-favorite'}`}>
                                        <path id="Vector" d="M6 7.2002V16.6854C6 18.0464 6 18.7268 6.20412 19.1433C6.58245 19.9151 7.41157 20.3588 8.26367 20.2454C8.7234 20.1842 9.28964 19.8067 10.4221 19.0518L10.4248 19.0499C10.8737 18.7507 11.0981 18.6011 11.333 18.5181C11.7642 18.3656 12.2348 18.3656 12.666 18.5181C12.9013 18.6012 13.1266 18.7515 13.5773 19.0519C14.7098 19.8069 15.2767 20.1841 15.7364 20.2452C16.5885 20.3586 17.4176 19.9151 17.7959 19.1433C18 18.7269 18 18.0462 18 16.6854V7.19691C18 6.07899 18 5.5192 17.7822 5.0918C17.5905 4.71547 17.2837 4.40973 16.9074 4.21799C16.4796 4 15.9203 4 14.8002 4H9.2002C8.08009 4 7.51962 4 7.0918 4.21799C6.71547 4.40973 6.40973 4.71547 6.21799 5.0918C6 5.51962 6 6.08009 6 7.2002Z"
                                              stroke="#000000"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              fill={isFavorite ? 'red' : 'none'}
                                              strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <h2 className='productCard__info-subtitle'>{data.title}</h2>

                        <ul className='productCard__info-description'>
                            {data.description}
                        </ul>
                    </div>

                    <button className='productCard__back-btn btn-reset' onClick={handleGoBack}>
                        <img src={backArrow} alt='Back'/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;