import '../../scss/CategoryMenu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategory, resetFilter } from '../../reducers/productReducer.js';
import { useEffect, useState } from 'react';

const CategoryMenu = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.list);
    const [activeCategory, setActiveCategory] = useState(null);
    const isLoading = useSelector(state => state.products.isLoading); // Состояние загрузки

    useEffect(() => {
        handleClearFilter();
    }, []);

    const handleCategoryClick = (category) => {
        const cat = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
        dispatch(filterByCategory(cat));
        setActiveCategory(category);
    };

    const handleClearFilter = () => {
        dispatch(resetFilter());
        setActiveCategory(null);
    };

    return (
        <div className="category">
            <div className='category__container container'>
                <ul className='category__container-list'>
                    <li className={`category__container-list--item ${activeCategory === null ? 'active' : ''}`}>
                        <button
                            onClick={handleClearFilter}
                            className='btn-reset'
                            style={{display: isLoading ? 'none' : 'block'}}
                        >
                            ALL
                        </button>
                    </li>
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className={`category__container-list--item ${activeCategory === category.name ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <button className='btn-reset'>{category.name.toUpperCase()}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryMenu;