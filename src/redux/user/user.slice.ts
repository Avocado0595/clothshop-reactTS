import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from './user.interface';
import type { RootState } from '../../redux/store';

export interface UserState {
	currentUser: IUser | null;
	isLoading: boolean;
	errMessage?: string;
}

const initialState: UserState = {
	currentUser: null,
	isLoading: false,
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
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
