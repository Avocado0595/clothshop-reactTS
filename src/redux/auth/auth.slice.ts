// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import type { RootState } from '../../redux/store';

// export interface AuthState {
// 	isLoading:boolean;
// }

// const initialState: AuthState = {
// 	isLoading: false,
// };

// export const authSlice = createSlice({
// 	name: 'auth',
// 	initialState,
// 	reducers: {
// 		setLoading: (state, action: PayloadAction<boolean>) => {
// 			state.isLoading = action.payload;
// 		}
// 	},
// });

// export const { setLoading } = authSlice.actions;

// export const selectLoadingState = (state: RootState) => state.auth.isLoading;

// export default authSlice.reducer;
