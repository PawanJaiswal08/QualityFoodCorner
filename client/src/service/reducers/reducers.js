import { ActionTypes } from "../constants/action-types";

const intialBannerState = {
	isLoading: true,
	banner: [],
}

export const bannerReducer = (state = intialBannerState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_BANNER: 
			return { ...state, banner: payload, isLoading: false };

		default:
			return state;
	}
};

const intialState = {
	isLoading: true,
 	offers: [],
};

export const offersReducer = (state = intialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_OFFERS: 
			return { ...state, offers: payload, isLoading: false };

		default:
			return state;
	}
};

export const productsReducer = (state = { isLoading: true, products: [] }, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_PRODUCTS: 
			return { ...state, products: payload, isLoading: false };

		default:
			return state;
	}
};

export const developersReducer = (state = { isLoading: true, developers: [] }, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_DEVELOPERS: 
			return { ...state, developers: payload, isLoading: false };

		default:
			return state;
	}
};

export const categoriesReducer = (state = { isLoading: true, categories: [] }, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_CATEGORIES: 
			return { ...state, categories: payload, isLoading: false };

		default:
			return state;
	}
};

export const storesReducer = (state = { isLoading: true, stores: [] }, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_STORES: 
			return { ...state, stores: payload, isLoading: false };

		default:
			return state;
	}
};