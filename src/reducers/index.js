import { combineReducers } from 'redux';
import productReducer from './productReducer.js';
import categoryReducer from "./categoryReducer.js";
import userReducer from "./userReducer.js";

const rootReducer = combineReducers({
    products: productReducer,
    categories: categoryReducer,
    user: userReducer,
});

export default rootReducer;