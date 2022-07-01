import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from './user.interface';
import type { RootState } from '../../redux/store';

export interface UserState {
	currentUser: IUser | null,
	isLoading: boolean,
	errMessage?: string
}

const initialState: UserState = {
	currentUser: null,
	isLoading: false
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<IUser>) => {
			state.currentUser = action.payload;
		},
		clearCurrentUser: (state) => {
			state.currentUser = null;
		},
	},
	// extraReducers: (builder) => {
	// 	// Promise pending
	// 	builder.addCase(fetchProduct.pending, (state) => {
	// 	// Bật trạng thái loading
	// 	state.isLoading = true;
	// 	});
	
	// 	// Promise fulfilled
	// 	builder.addCase(fetchProduct.fulfilled, (state, action) => {
	// 	// Tắt trạng thái loading, lưu thông tin user vào store
	// 	state.isLoading = false;
	// 	state.productList = action.payload as IProduct[];
	// 	});
	
	// 	// Promise rejected
	// 	builder.addCase(fetchProduct.rejected, (state, action) => {
	// 	// Tắt trạng thái loading, lưu thông báo lỗi vào store
	// 	state.isLoading = false;
	// 	state.errMessage = action.payload;
	// 	});
	// }
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
