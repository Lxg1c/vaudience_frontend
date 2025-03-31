import deleteIcon from '../../assets/delete.svg';
import "./Favorite.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromFavorite } from "../../app/store/slices/userSlice.js";
import { Link } from "react-router-dom";

const Favorite = () => {
    const dispatch = useDispatch();
    const favorite = useSelector(state => state.user.favorite);

    const handleDelete = (product) => {
        dispatch(removeItemFromFavorite({ id: product.id, size: product.size }));
    };

    return (
        <div className="favorite__container container">
            {favorite.length === 0 ? (
                <div className="favorite__empty">
                    <h2>Ваш список избранного пуст</h2>
                    <Link to="/" className="favorite__empty-link">Вернуться к покупкам</Link>
                </div>
            ) : (
                <ul className='favorite__list'>
                    {favorite.map((product) => (
                        <li key={product.id} className='favorite__item'>
                            <Link to={`/products/${product.id}`} key={product.id} className="product__link">
                                <div className='favorite__item'>
                                    <img src={product.category.image} className='favorite__item-img' alt={product.name}/>
                                    <div className='favorite__item-details'>
                                        <div>
                                            <h3 className='favorite__item-title favorite__title'>{product.title}</h3>
                                        </div>

                                        <div className='favorite__item-price-wrapper'>
                                            <h1 className='favorite__item-price favorite__price'>{product.price * 100} ₽</h1>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <button
                                className='btn-reset favorite__item-btn--delete'
                                onClick={() => handleDelete(product)}
                            >
                                <img src={deleteIcon} alt='Удалить товар'/>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorite;