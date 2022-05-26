import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../../interfaces/IProduct';
import type { RootState } from '../../redux/store';

export interface ICartItem extends IProduct {
	quantity: number;
}
interface CartState {
	hidden: boolean;
	itemList: ICartItem[];
}

const initialState: CartState = { hidden: true, itemList: [] };

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		toggleCart: (state) => {
			state.hidden = !state.hidden;
		},
		addItem: (state, action: PayloadAction<ICartItem>) => {
			const oldList = [...state.itemList];
			const existItem = oldList.findIndex(
				(i) => i.id === action.payload.id
			);
			if (existItem === -1) {
				oldList.push({ ...action.payload, quantity: 1 });
			} else {
				oldList[existItem].quantity += 1;
			}
			state.itemList = [...oldList];
		},
		removeItem: (state, action: PayloadAction<ICartItem>) => {
			const oldList = [...state.itemList];
			const existItem = oldList.findIndex(
				(i) => i.id === action.payload.id
			);
			if (existItem === -1) {
				return;
			} else {
				if (oldList[existItem].quantity === 1)
					oldList.splice(existItem, 1);
				else oldList[existItem].quantity -= 1;
			}
			state.itemList = [...oldList];
		},
		deleteItem: (state, action: PayloadAction<ICartItem>) => {
			state.itemList = state.itemList.filter(
				(i) => i.id !== action.payload.id
			);
		},
	},
});

export const { toggleCart, addItem, removeItem, deleteItem } =
	cartSlice.actions;

export const selectCartList = (state: RootState) => state.cart.itemList;
export const selectCartToggle = (state: RootState) => state.cart.hidden;
export const selectTotalPrice = (state: RootState) =>
	state.cart.itemList.reduce(
		(total, item) => total + item.quantity * item.price,
		0
	);

export default cartSlice.reducer;
