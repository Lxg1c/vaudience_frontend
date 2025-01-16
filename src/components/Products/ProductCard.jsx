import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../js/api.js";
import '../../scss/ProductCard.scss';
import backArrow from '../../assets/backArrow.svg';
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../reducers/userReducer.js";

const SIZES = [4, 5, 8, 12]

const ProductCard = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [productCount, setProductCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);

    const { data, error, isLoading } = useGetProductQuery({ id });

    const { currentUser} = useSelector(({ user}) => user)

    const handleClick = () => {
        if (!currentUser) navigate('/register')
        else handleAddToCart()
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message || 'Something went wrong'}</div>;
    if (!data) return <div>No product found</div>;


    const handleGoBack = () => navigate(-1);
    const handleAddCount = () => setProductCount(prevCount => prevCount + 1);
    const handleRemoveCount = () => setProductCount(prevCount => Math.max(prevCount - 1, 1));
    const handleAddToCart = () => {
        if (selectedSize) {
            dispatch(addItemToCart({ ...data, quantity: productCount, size: selectedSize }));
        }
        else {
            console.log("Choose a size")
        }
    }

    const handleChangeSize = (size) => {
       setSelectedSize(size);
    }

    return (
        <div className="productCard">
            <div className='productCard__container container'>
                <div className='productCard__container-main'>
                    <img className="productCard__image" src={data.image} alt={data.title} style={{maxWidth: '410px'}} />
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
                                            className={`productCard__info-size--btn btn-reset ${selectedSize === size ? 'selected' : ''}`}>
                                        {size}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div style={{display: 'flex', alignItems: 'center', gap: '32px', marginTop: '20px'}}>
                            <div className='productCard__info-count'>
                                <div className='productCard__info-count--minus btn-reset'
                                     onClick={handleRemoveCount}>-
                                </div>
                                <span>{productCount}</span>
                                <div className='productCard__info-count--plus btn-reset' onClick={handleAddCount}>+
                                </div>
                            </div>

                            <div className='productCard__info-buy'>
                                <button className='productCard__info-buy--btn' onClick={handleClick}>To Cart</button>
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