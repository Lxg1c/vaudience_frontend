import deleteIcon from "@/assets/delete.svg";
import "./Favorite.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromFavorite } from "@/enteties/user/model/userSlice.js";
import { Link } from "react-router-dom";
import Button from "@/shared/ui/Button/Button.jsx";

const Favorite = () => {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.user.favorite);

  const handleDelete = (product) => {
    dispatch(removeItemFromFavorite({ id: product.id, size: product.size }));
  };

  return (
    <div className="favorite">
      <div className="favorite__container container">
        {favorite.length === 0 ? (
          <div className="favorite__empty">
            <h2 className="favorite__empty-title">Ваш список избранного пуст</h2>
            <Link to="/" className="favorite__empty-link">
              Вернуться к покупкам
            </Link>
          </div>
        ) : (
          <ul className="favorite__list">
            {favorite.map((product) => (
              <li key={`${product.id}-${product.size}`} className="favorite__item">
                <div className="favorite__item-content">
                  <div className="favorite__item-info">
                    <img
                      src={
                        product.images.find((img) => img.is_primary)?.url || product.images[0]?.url
                      }
                      className="favorite__item-img"
                      alt={product.name}
                    />
                    <div className="favorite__item-details">
                      <h3 className="favorite__item-title">{product.name}</h3>
                      <p className="favorite__item-size">Размер: {product.size}</p>
                    </div>
                  </div>

                  <div className="favorite__item-price">{product.price} ₽</div>

                  <div className="favorite__item-btns">
                    <button
                      className="favorite__item-delete"
                      onClick={() => handleDelete(product)}
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorite;
