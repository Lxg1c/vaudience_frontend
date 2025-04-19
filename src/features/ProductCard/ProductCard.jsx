import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import "@/shared/ui/Button/Button.scss";
import { notification } from "antd";
import { useGetProductQuery } from "@/enteties/product/model/productApi.js";
import { addProductToCart } from "@/enteties/cart/index.js";
import Loader from "@/shared/ui/Loader/Loader.jsx";
import {addToFavorite, removeFromFavorite} from "@/enteties/favorite/index.js";

const ProductCard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const { data, error, isLoading } = useGetProductQuery(id);
  const favorite = useSelector(state => state.favorite.favorite);
  const currentUser = useSelector(state => state.user.currentUser);
  const [api, contextHolder] = notification.useNotification();
  const isFavorite = data && favorite?.some((item) => item.product_id === data.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <Loader />
      </div>
    );

  if (error) return <div>Error: {error.message || "ОШИБКА. ЧТО-ТО ПОШЛО НЕ ТАК"}</div>;
  if (!data) return <div>No product found</div>;

  const handleAddCount = () => setProductCount((prev) => prev + 1);
  const handleRemoveCount = () => setProductCount((prev) => Math.max(prev - 1, 1));

  const showNotification = (type, message, description = "", placement = "topRight") => {
    api[type]({
      message,
      description,
      placement,
    });
  };

  const handleClick = () => {
    if (!currentUser) {
      navigate("/login");
      showNotification("warning", "Требуется авторизация", "Пожалуйста, войдите в систему");
    } else {
      handleAddToCart();
    }
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const id = currentUser.id;
      const productData = {
        product_id: data.id,
        size: selectedSize.toLowerCase(),
        quantity: productCount,
      };
      dispatch(addProductToCart({ id, productData }));
      showNotification(
        "success",
        "Товар добавлен в корзину",
        `${data.name}, размер: ${selectedSize}`,
      );
    } else {
      showNotification("warning", "Выберите размер", "Пожалуйста, укажите размер товара");
    }
  };

  const handleChangeSize = (size) => {
    setSelectedSize(size);
  };

  const toggleFavorite = () => {
    if (!currentUser) {
      navigate("/login");
      showNotification("warning", "Требуется авторизация", "Пожалуйста, войдите в систему");
      return;
    }



    if (isFavorite) {
      dispatch(removeFromFavorite({ user_id: currentUser.id, product_id: data.id }));
      showNotification("success", "Удалено из избранного", `${data.name} больше не в избранном`);
    } else {
      dispatch(addToFavorite({ user_id: currentUser.id, product_id: data.id }));
      showNotification("success", "Добавлено в избранное", `${data.name} теперь в избранном`);
    }
  };

  return (
    <div className="productCard">
      {contextHolder}
      <div className="productCard__container container">
        <div className="productCard__container-main">
          <Carousel style={{ flex: 1 }}>
            {data.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="productCard__image" src={image.url} alt="product-image" />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="productCard__info">
            <h2 className="productCard__info-title">{data.title}</h2>
            <h2 className="productCard__info-price">{data.price} ₽</h2>

            <p className="productCard__info-size">Размер</p>
            <ul className="productCard__info-size--list">
              {data.sizes.map((sizeObj) => (
                <li key={sizeObj.size}>
                  <button
                    onClick={() => handleChangeSize(sizeObj.size)}
                    className={`button productCard__info-size--btn btn-reset ${selectedSize === sizeObj.size ? "selected" : ""}`}
                  >
                    {sizeObj.size}
                  </button>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", alignItems: "center", gap: "32px", marginTop: "20px" }}>
              <div className="productCard__info-count">
                <div
                  className="productCard__info-count--minus btn-reset"
                  onClick={handleRemoveCount}
                >
                  -
                </div>
                <span>{productCount}</span>
                <div className="productCard__info-count--plus btn-reset" onClick={handleAddCount}>
                  +
                </div>
              </div>

              <div className="productCard__info-buy">
                <button
                  className="productCard__info-buy--btn btn-reset"
                  onClick={handleClick}
                  disabled={!selectedSize}
                >
                  В корзину
                </button>
                <button
                  className="btn-reset productCard__info-favorite"
                  onClick={toggleFavorite}
                >
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={isFavorite ? "favorite-icon" : "not-favorite-icon"}
                  >
                    <path
                      d="M6 7.2002V16.6854C6 18.0464 6 18.7268 6.20412 19.1433C6.58245 19.9151 7.41157 20.3588 8.26367 20.2454C8.7234 20.1842 9.28964 19.8067 10.4221 19.0518L10.4248 19.0499C10.8737 18.7507 11.0981 18.6011 11.333 18.5181C11.7642 18.3656 12.2348 18.3656 12.666 18.5181C12.9013 18.6012 13.1266 18.7515 13.5773 19.0519C14.7098 19.8069 15.2767 20.1841 15.7364 20.2452C16.5885 20.3586 17.4176 19.9151 17.7959 19.1433C18 18.7269 18 18.0462 18 16.6854V7.19691C18 6.07899 18 5.5192 17.7822 5.0918C17.5905 4.71547 17.2837 4.40973 16.9074 4.21799C16.4796 4 15.9203 4 14.8002 4H9.2002C8.08009 4 7.51962 4 7.0918 4.21799C6.71547 4.40973 6.40973 4.71547 6.21799 5.0918C6 5.51962 6 6.08009 6 7.2002Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill={isFavorite ? "red" : "none"}
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <h2 className="productCard__info-subtitle">{data.name}</h2>

            {Array.isArray(data.description) ? (
              <ul className="productCard__info-description">
                {data.description.map((desc, index) => (
                  <li key={index} className="productCard__info-description-item">
                    {desc}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="productCard__info-description">{data.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
