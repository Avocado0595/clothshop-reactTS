import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import ICollection from './collection.interface';
import type { RootState } from '../store';
import { getCollectionById, getCollectionByTitle, getCollectionList } from './collection.api';

export interface CollectionState {
	collectionList: ICollection[],
	currentCollection?:ICollection,
	isLoading: boolean,
	errMessage?:any
}

const initialState: CollectionState = { collectionList: [], isLoading: false };

export const collectionSlice = createSlice({
	name: 'collection',
	initialState,
	reducers: {
		getCollection: (state) => state,
		getCollectionFromApi: (state, action: PayloadAction<ICollection[]>)=>{
			state.collectionList = action.payload;
		}
		
	},
	extraReducers: (builder) => {
		builder.addCase(getCollectionList.pending, (state) => {
			state.isLoading = true;
		});
	
		builder.addCase(getCollectionList.fulfilled, (state, action) => {
		state.isLoading = false;
		state.collectionList = action.payload as ICollection[];
		});
	
		builder.addCase(getCollectionList.rejected, (state, action) => {
		state.isLoading = false;
		state.errMessage = action.payload;
		});
		//////////
		builder.addCase(getCollectionByTitle.pending, (state) => {
			state.isLoading = true;
		});
	
		builder.addCase(getCollectionByTitle.fulfilled, (state, action) => {
		state.isLoading = false;
		state.currentCollection = action.payload as ICollection;
		});
	
		builder.addCase(getCollectionByTitle.rejected, (state, action) => {
		state.isLoading = false;
		state.errMessage = action.payload;
		});
		/////////
		builder.addCase(getCollectionById.pending, (state) => {
			state.isLoading = true;
		});
	
		builder.addCase(getCollectionById.fulfilled, (state, action) => {
		state.isLoading = false;
		state.currentCollection = action.payload as ICollection;
		});
	
		builder.addCase(getCollectionById.rejected, (state, action) => {
		state.isLoading = false;
		state.errMessage = action.payload;
		});
	}
});

export const { getCollection, getCollectionFromApi } = collectionSlice.actions;

export const selectCollection = (state: RootState) =>state.collection.collectionList;
export const selectCurrentCollection = (state: RootState) =>state.collection.currentCollection;

export default collectionSlice.reducer;
