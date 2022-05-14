import IProduct from '../../interfaces/IProduct';
import { ICartAction } from './cart.interface';
import CartActionTypes from './cart.types';

export const toggleCart = (): ICartAction => ({
	type: CartActionTypes.TOGGLE_CART,
	payload: null,
});

export const addItem = (item: IProduct): ICartAction => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item,
});

export const reduceItem = (item: IProduct): ICartAction => ({
	type: CartActionTypes.REDUCE_ITEM,
	payload: item,
});

export const deleteItem = (item: IProduct): ICartAction => ({
	type: CartActionTypes.DELETE_ITEM,
	payload: item,
});
