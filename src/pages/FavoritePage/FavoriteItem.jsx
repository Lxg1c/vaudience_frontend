import deleteIcon from "@/assets/delete.svg";
import Button from "@/shared/ui/Button/Button.jsx";
import { useGetProductQuery } from "@/enteties/product/index.js";
import { PropTypes } from "prop-types";
import { removeFromFavorite } from "@/enteties/favorite/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FavoriteItem = ({ favoriteItem }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const { data: product, error, isLoading } = useGetProductQuery(favoriteItem.product_id);

    const handleDelete = () => {
        dispatch(removeFromFavorite({ user_id: currentUser.id, product_id: product.id }));
    };

    if (isLoading || !product) return null;
    if (error) return <li className="favorite__item">Ошибка при загрузке товара</li>;

    return (
        <li className="favorite__item">
            <div className="favorite__item-content">
                <div className="favorite__item-info">
                    <img
                        src={product.images.find((img) => img.is_primary)?.url || product.images[0]?.url}
                        className="favorite__item-img"
                        alt={product.name}
                    />
                    <div className="favorite__item-details">
                        <h3 className="favorite__item-title">{product.name}</h3>
                        <p className="favorite__item-size">Размеры: {product.sizes.map(s => s.size).join(", ")}</p>
                    </div>
                </div>

                <div className="favorite__item-price">{product.price} ₽</div>

                <div className="favorite__item-btns">
                    <button
                        className="favorite__item-delete"
                        onClick={handleDelete}
                        aria-label="Удалить из избранного"
                    >
                        <img
                            src={deleteIcon}
                            alt="Удалить из избранного"
                            className="favorite__delete-icon"
                        />
                    </button>

                    <Link to={`/products/${product.id}`}>
                        <Button text="Выбрать размер" />
                    </Link>
                </div>
            </div>
        </li>
    );
};

FavoriteItem.propTypes = {
    favoriteItem: PropTypes.object.isRequired,
};

export default FavoriteItem;
