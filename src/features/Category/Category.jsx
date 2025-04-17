import "./Category.scss";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { setActiveCategory } from "@/enteties/category";
import { filterByCategory, resetFilter } from "@/enteties/product/model/productSlice.js";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);
  const activeCategory = useSelector((state) => state.categories.activeCategory);

  const handleClearFilter = useCallback(() => {
    dispatch(resetFilter());
    dispatch(setActiveCategory(null));
  }, [dispatch]);

  useEffect(() => {
    handleClearFilter();
  }, [handleClearFilter]);

  const handleCategoryClick = (categoryId) => {
    dispatch(filterByCategory(categoryId));
    dispatch(setActiveCategory(categoryId));
  };

  return (
    <div className="category">
      <div className="category__container container">
        <ul className="category__container-list">
          {categories.map((category) => (
            <li
              key={category.id}
              className="category__container-list--item"
              onClick={() => handleCategoryClick(category.id)}
            >
              <button
                className={`btn-reset ${activeCategory === category.id ? "active-category" : ""}`}
              >
                {category.name.toUpperCase()}
              </button>
            </li>
          ))}
          <li className="category__container-list--item" onClick={handleClearFilter}>
            <button className="btn-reset">ОЧИСТИТЬ</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Category;
