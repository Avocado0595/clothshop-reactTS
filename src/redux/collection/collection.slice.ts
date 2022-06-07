import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import ICollection from '../../interfaces/ICollection';
import type { RootState } from '../store';

export interface CollectionState {
	collectionList: ICollection[];
}

const initialState: CollectionState = { collectionList: [] };

export const collectionSlice = createSlice({
	name: 'collection',
	initialState,
	reducers: {
		getCollection: (state) => state,
		getCollectionFromApi: (state, action: PayloadAction<ICollection[]>)=>{
			state.collectionList = action.payload;
		}
		
	},
});

export const { getCollection, getCollectionFromApi } = collectionSlice.actions;

export const selectCollection = (state: RootState) =>
	state.collection.collectionList;

export default collectionSlice.reducer;
