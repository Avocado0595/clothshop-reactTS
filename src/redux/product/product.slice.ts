import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import IProduct from '../../interfaces/IProduct';
import { getProductBycollection, getProductById, getProductList } from './product.api';

export interface ProductState {
	productList: IProduct[],
	productListByCollection?: IProduct[],
	currentProduct?: IProduct,
	isLoading: boolean,
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
		/////////////////////////////
		builder.addCase(getProductById.pending, (state) => {
			state.isLoading = true;
			});
	
		builder.addCase(getProductById.fulfilled, (state, action) => {
		state.isLoading = false;
		state.currentProduct = action.payload as IProduct;
		});
	
		builder.addCase(getProductById.rejected, (state, action) => {
		state.isLoading = false;
		state.errMessage = action.payload;
		});
		//////////////////////////
		builder.addCase(getProductBycollection.pending, (state) => {
			state.isLoading = true;
			});
	
		builder.addCase(getProductBycollection.fulfilled, (state, action) => {
		state.isLoading = false;
		state.productListByCollection = action.payload as IProduct[];
		});
	
		builder.addCase(getProductBycollection.rejected, (state, action) => {
		state.isLoading = false;
		state.errMessage = action.payload;
		});
	}
});

export const { getProduct, getProductFromApi } = productSlice.actions;

export const selectProductList = (state: RootState) => state.product.productList;
export const selectCurrentProduct = (state: RootState) => state.product.currentProduct;
//export const selectLoading = (state:RootState)=>({loading:state.product.isLoading, errMessage: state.product.errMessage});
export const selectProductByCollection = (state: RootState) =>state.product.productListByCollection;

export const selectSearchProduct = (state: RootState, p: string) =>
	state.product.productList.filter((i) =>
		i.name.toLowerCase().includes(p.toLowerCase()));

export const selectListProductName = (state: RootState) =>
	state.product.productList.map((i) => ({ name: i.name, id: i.id, collectionId: i.collectionId }));

export default productSlice.reducer;
