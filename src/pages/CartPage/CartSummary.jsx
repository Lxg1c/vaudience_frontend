import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const CartSummary = ({
  cartLength,
  promoCode,
  onPromoCodeChange,
  onApplyPromoCode,
  totalPrice,
}) => {
  return (
    <div className="cart__summary">
      <h1 className="cart__summary-title">Детали заказа</h1>

      <div className="cart__summary-count-wrapper">
        <p className="cart__summary-count cart__text">{cartLength} товара на сумму</p>
        <p className="cart__item-price">{totalPrice} ₽</p>
      </div>

      <div className="cart__promo-code-wrapper">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Промокод"
          value={promoCode}
          onChange={onPromoCodeChange}
          className="cart__promo-code-input"
        />
        <button onClick={onApplyPromoCode} className="cart__promo-code-button">
          Применить промокод
        </button>
      </div>

      <div className="cart__summary-result-wrapper">
        <h3 className="cart__summary-result">Итого</h3>
        <p className="cart__item-price">{totalPrice} ₽</p>
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  cartLength: PropTypes.number.isRequired,
  promoCode: PropTypes.string.isRequired,
  onPromoCodeChange: PropTypes.func.isRequired,
  onApplyPromoCode: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default CartSummary;
