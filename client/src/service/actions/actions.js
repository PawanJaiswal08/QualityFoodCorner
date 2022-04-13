import { ActionTypes } from "../constants/action-types";

export const setBanner = (banner) => {
    return {
		type: ActionTypes.SET_BANNER,
		payload: banner,
	};
};

export const setOffers = (offers) => {
    return {
		type: ActionTypes.SET_OFFERS,
		payload: offers,
	};
};

export const setProducts = (products) => {
    return {
		type: ActionTypes.SET_PRODUCTS,
		payload: products,
	};
};

export const setDevelopers = (developers) => {
    return {
		type: ActionTypes.SET_DEVELOPERS,
		payload: developers,
	};
};


export const setCategories = (categories) => {
    return {
		type: ActionTypes.SET_CATEGORIES,
		payload: categories,
	};
};

export const setStores = (stores) => {
    return {
		type: ActionTypes.SET_STORES,
		payload: stores,
	};
};