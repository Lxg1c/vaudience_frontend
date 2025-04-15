import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../app/store/slices/userSlice.js";
import deleteIcon from "../../assets/delete.svg";
import "./Cart.scss";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.user.cart);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const validPromoCodes = ["promo", "loci"];

  const handleDelete = (product) => {
    dispatch(removeItemFromCart({ id: product.id, size: product.size }));
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity({ id: product.id, size: product.size }));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity({ id: product.id, size: product.size }));
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    if (validPromoCodes.includes(promoCode)) {
      setDiscount(0.1);
    } else {
      alert("Неверный промокод");
    }
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    return total - total * discount;
  };

  return (
    <div className="cart__container container">
      <div className="cart__content">
        <ul className="cart__list">
          {cart.map((product) => (
            <li key={product.id} className="cart__item">
              <div className="cart__item-left">
                <img
                  src={product.images.find((img) => img.is_primary)?.url || product.images[0]?.url}
                  className="cart__item-img"
                  alt={product.name}
                />
                <div className="cart__item-details">
                  <div>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="cart__item-title cart__title">
                        {product.name}, размер: {product.size}
                      </h3>
                    </Link>
                  </div>

                  <div className="cart__item-price-wrapper">
                    <h1 className="cart__item-price">{product.price} ₽</h1>

                    <div className="productCard__info-count">
                      <div
                        className="productCard__info-count--minus btn-reset"
                        onClick={() => handleDecreaseQuantity(product)}
                      >
                        -
                      </div>
                      <span>{product.quantity}</span>
                      <div
                        className="productCard__info-count--plus btn-reset"
                        onClick={() => handleIncreaseQuantity(product)}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn-reset cart__item-btn--delete"
                    onClick={() => handleDelete(product)}
                  >
                    <img src={deleteIcon} alt="Удалить товар" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="cart__summary">
        <h1 className="cart__summary-title">Детали заказа</h1>
        <div className="cart__summary-count-wrapper">
          <p className="cart__summary-count cart__text">{cart.length} Товара на сумму</p>
          <p className="cart__item-price">{calculateTotal()} ₽</p>
        </div>

        <div className="cart__promo-code-wrapper">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Промокод"
            value={promoCode}
            onChange={handlePromoCodeChange}
            className="cart__promo-code-input"
          />
          <button onClick={applyPromoCode} className="cart__promo-code-button">
            Применить промокод
          </button>
        </div>

        <div className="cart__summary-result-wrapper">
          <h3 className="cart__summary-result">Итого</h3>
          <p className="cart__item-price">{calculateTotal()} ₽</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
