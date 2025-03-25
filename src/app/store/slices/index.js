import { combineReducers } from 'redux';
import productReducer from './productSlice.js';
import categoryReducer from "./categorySlice.js";
import userReducer from "./userSlice.js";

const rootReducer = combineReducers({
    products: productReducer,
    categories: categoryReducer,
    user: userReducer,
});

export default rootReducer;