import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import IProduct from '../../interfaces/IProduct';
import { fetchProduct } from '../../fetch-data/product.fetch';

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
		// Bắt đầu thực hiện action login (Promise pending)
		builder.addCase(fetchProduct.pending, (state) => {
		// Bật trạng thái loading
		state.isLoading = true;
		});
	
		// Khi thực hiện action login thành công (Promise fulfilled)
		builder.addCase(fetchProduct.fulfilled, (state, action) => {
		// Tắt trạng thái loading, lưu thông tin user vào store
		state.isLoading = false;
		state.productList = action.payload as IProduct[];
		console.log(state.productList)
		});
	
		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(fetchProduct.rejected, (state, action) => {
		// Tắt trạng thái loading, lưu thông báo lỗi vào store
		state.isLoading = false;
		state.errMessage = action.payload;
		});
	}
});

export const { getProduct, getProductFromApi } = productSlice.actions;

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
