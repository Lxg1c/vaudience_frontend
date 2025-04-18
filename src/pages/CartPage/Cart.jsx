import { useState, useMemo, useEffect, useCallback } from "react"; // Именованный импорт. Забирает конкретные хуки из библиотеки React
import "./Cart.scss"; // Импорт ресурса. Загружает SCSS, применяется как стили
import CartItem from "@/pages/CartPage/CartItem.jsx"; // Импорт по умолчанию. Импортирует компонент по default-экспорту
import CartSummary from "@/pages/CartPage/CartSummary.jsx";
import { getProductById } from "@/enteties/product/index.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/shared/ui/Loader/Loader.jsx";

const Cart = () => {
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [productsWithData, setProductsWithData] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const isLoading = useSelector((state) => state.products.isLoading);

  const validPromoCodes = ["promo", "loci"];
  console.log(cart)

  const loadProducts = useCallback(async () => {
    const loadedProducts = await Promise.all(
      cart.map(async (item) => {
        const data = await dispatch(getProductById(item.product_id));
        return {
          ...item,
          product: data.payload,
        };
      }),
    );
    setProductsWithData(loadedProducts);
  }, [cart, dispatch]);

  useEffect(() => {
    loadProducts();
  }, [cart, dispatch, loadProducts]);

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    if (validPromoCodes.includes(promoCode.toLowerCase().trim())) {
      setDiscount(0.1); // 10%
    } else {
      alert("Неверный промокод");
    }
  };

  const totalPrice = useMemo(() => {
    const total = productsWithData.reduce((sum, item) => {
      if (!item.product) return sum;
      return sum + item.product.price * item.quantity;
    }, 0);
    return Math.round(total - total * discount);
  }, [productsWithData, discount]);

  return (
    <div className="cart__container container">
      <div className="cart__content">
        {isLoading ? (
          <div className="cart__loader">
            <Loader />
          </div>
        ) : (
          <ul className="cart__list">
            {productsWithData.map((item) =>
              !item.product ? null : <CartItem key={`${item.id}-${item.size}`} item={item} />,
            )}
          </ul>
        )}
      </div>

      <CartSummary
        cartLength={cart.length}
        promoCode={promoCode}
        onPromoCodeChange={handlePromoCodeChange}
        onApplyPromoCode={applyPromoCode}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default Cart;
