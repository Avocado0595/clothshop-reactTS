import { createSlice } from '@reduxjs/toolkit';
import PRODUCTS from '../../database/product.mock';
import type { RootState } from '../store';
import IProduct from '../../interfaces/IProduct';

export interface ProductState {
	productList: IProduct[];
}

const initialState: ProductState = { productList: PRODUCTS };

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		getProduct: (state) => state,
	},
});

export const { getProduct } = productSlice.actions;

export const selectProduct = (state: RootState) => state.product.productList;
export const selectByProductId = (state: RootState, id: number) =>
	state.product.productList.filter((p) => p.id === id)[0];
export const selectSearchProduct = (state: RootState, p: string) =>
	state.product.productList.filter((i) =>
		i.name.toLowerCase().includes(p.toLowerCase())
	);
export const selectListProductName = (state: RootState) =>
	state.product.productList.map((i) => ({ name: i.name, id: i.id }));

export default productSlice.reducer;
