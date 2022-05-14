import IUser from '../../interfaces/IUser';
import { IAction } from './user.reducer';
import UserActionTypes from './user.types';

export const setCurrentUser = (user: IUser): IAction => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user as IUser,
});

export const clearCurrentUser = (): IAction => ({
	type: UserActionTypes.CLEAR_CURRENT_USER,
	payload: null,
});
