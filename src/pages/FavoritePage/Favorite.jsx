import "./Favorite.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteItem from "@/pages/FavoritePage/FavoriteItem.jsx";

const Favorite = () => {
  const favorite = useSelector((state) => state.favorite.favorite);

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
              <FavoriteItem key={product.id} favoriteItem={product} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorite;
