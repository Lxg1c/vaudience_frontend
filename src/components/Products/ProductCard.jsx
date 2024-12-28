import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../api.js";
import '../../styles/ProductCard.scss';
import backArrow from '../../assets/backArrow.svg';
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../reducers/userReducer.js";

const ProductCard = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [productCount, setProductCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');

    const { data, error, isLoading } = useGetProductQuery({ id });

    const { currentUser} = useSelector(({ user}) => user)

    const handleClick = () => {
        if (!currentUser) navigate('/register')
        else handleAddToCart()
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message || 'Something went wrong'}</div>;
    if (!data) return <div>No product found</div>;

    const name = data.product_name
    const img = data.image_url
    const sizesList = data.product_sizes.split('/')
    const price = data.product_price.toLocaleString().replace(/,/g, " ");
    const description = data.product_description.split('\n')

    const handleGoBack = () => navigate(-1);
    const handleAddCount = () => setProductCount(prevCount => prevCount + 1);
    const handleRemoveCount = () => setProductCount(prevCount => Math.max(prevCount - 1, 1));
    const handleAddToCart = () => {
        if (selectedSize) {
            dispatch(addItemToCart({ ...data, quantity: productCount, size: selectedSize }));
        } else {
            alert('Please select a size');
        }
    }
    const handleChangeSize = (size) => {
        setSelectedSize(size);
    }

    return (
        <div className="productCard">
            <div className='productCard__container container'>
                <div className='productCard__container-main'>
                    <img className="productCard__image" src={img} alt={name}/>
                    <div className='productCard__info'>
                        <h2 className='productCard__info-title'>{name}</h2>
                        <h2 className='productCard__info-price'>{price} ₽</h2>

                        <p className='productCard__info-size'>
                            Размер
                        </p>
                        <ul className="productCard__info-size--list">
                            {sizesList.map((size) => (
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

                        <h2 className='productCard__info-subtitle'>{name}</h2>

                        <ul className='productCard__info-description'>
                            {/*{description}*/}
                            {description.map((item, index) => (
                                <li className="productCard__info-description-item" key={index}>{item}</li>
                            ))}
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