import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import IProduct from '../../interfaces/IProduct';
import { getProductList } from './product.api';

export interface ProductState {
	productList: IProduct[];
	isLoading: boolean;
	errMessage?: any
}

const initialState: ProductState = { productList: [], isLoading: false};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		getProduct: (state) => state,
		getProductFromApi: (state, action: PayloadAction<IProduct[]>)=>{
			state.productList = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getProductList.pending, (state) => {
		state.isLoading = true;
		});
	
		builder.addCase(getProductList.fulfilled, (state, action) => {
		state.isLoading = false;
		state.productList = action.payload as IProduct[];
		});
	
		builder.addCase(getProductList.rejected, (state, action) => {
		state.isLoading = false;
		state.errMessage = action.payload;
		});
	}
});

export const { getProduct, getProductFromApi } = productSlice.actions;

export const selectProduct = (state: RootState) => state.product.productList;
export const selectByProductId = (state: RootState, id: number) =>
	state.product.productList.filter((p) => p.id === id)[0];

export const selectByCollection = (state: RootState, id: number) =>
state.product.productList.filter((p) => p.collectionId === id);

export const selectSearchProduct = (state: RootState, p: string) =>
	state.product.productList.filter((i) =>
		i.name.toLowerCase().includes(p.toLowerCase()));

export const selectListProductName = (state: RootState) =>
	state.product.productList.map((i) => ({ name: i.name, id: i.id }));

export default productSlice.reducer;
