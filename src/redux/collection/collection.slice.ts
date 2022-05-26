import { createSlice } from '@reduxjs/toolkit';
import ICollection from '../../interfaces/ICollection';
import COLLECTIONS from '../../database/collection.mock';
import type { RootState } from '../store';

export interface CollectionState {
	collectionList: ICollection[];
}

const initialState: CollectionState = { collectionList: COLLECTIONS };

export const collectionSlice = createSlice({
	name: 'collection',
	initialState,
	reducers: {
		getCollection: (state) => state,
	},
});

export const { getCollection } = collectionSlice.actions;

export const selectCollection = (state: RootState) =>
	state.collection.collectionList;

export default collectionSlice.reducer;
