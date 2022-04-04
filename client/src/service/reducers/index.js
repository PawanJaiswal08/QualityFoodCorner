import { combineReducers } from "redux";
import { bannerReducer, offersReducer, productsReducer, developersReducer, categoriesReducer, storesReducer } from "./reducers";

const reducers = combineReducers({
    banner: bannerReducer,
    offers: offersReducer,
    products: productsReducer,
    developers: developersReducer,
    categories: categoriesReducer,
    stores: storesReducer,
});

export default reducers;