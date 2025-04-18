import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import deleteIcon from "@/assets/delete.svg";
import { changeItemQuantity, deleteProductFromCart } from "@/enteties/cart/index.js";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.currentUser.id);

  const handleDelete = () => {
    dispatch(
      deleteProductFromCart({
        product_id: item.product_id,
        user_id: user_id,
        size: item.size,
      }),
    );
  };

  const handleIncrease = () => {
    const newQuantity = item.quantity + 1;
    dispatch(
      changeItemQuantity({
        product_id: item.product_id,
        user_id: user_id,
        quantity: newQuantity,
      }),
    );
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(item.quantity - 1, 1);
    dispatch(
      changeItemQuantity({
        product_id: item.product_id,
        user_id: user_id,
        quantity: newQuantity,
      }),
    );
  };

  return (
    <li className="cart__item">
      <div className="cart__item-left">
        <img
          src={
            item.product.images?.find((img) => img.is_primary)?.url || item.product.images?.[0]?.url
          }
          className="cart__item-img"
          alt={item.product.name}
        />
        <div className="cart__item-details">
          <div>
            <Link to={`/products/${item.product.id}`}>
              <h3 className="cart__item-title cart__title">
                {item.product.name}, размер: {item.size}
              </h3>
            </Link>
          </div>

          <div className="cart__item-price-wrapper">
            <h1 className="cart__item-price">{item.product.price} ₽</h1>

            <div className="productCard__info-count">
              <div className="productCard__info-count--minus btn-reset" onClick={handleDecrease}>
                -
              </div>
              <span>{item.quantity}</span>
              <div className="productCard__info-count--plus btn-reset" onClick={handleIncrease}>
                +
              </div>
            </div>
          </div>

          <button className="btn-reset cart__item-btn--delete" onClick={handleDelete}>
            <img src={deleteIcon} alt="Удалить товар" />
          </button>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
