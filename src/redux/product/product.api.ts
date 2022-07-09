import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import handleSlugName from '../../helpers/handleSlugName';
import IProduct from '../../interfaces/IProduct';
import { db } from '../../firebase/firebase.utils';
export const getProductList = createAsyncThunk(
	'product/getProductList',
	async (data, { rejectWithValue }) => {
		const api = import.meta.env.VITE_FIREBASE_API_URL as string;
		const response = await fetch(`${api}/products?pageSize=50`);
		const jsonData = await response.json();

		if (response.status < 200 || response.status >= 300) {
			return rejectWithValue(jsonData);
		}

		const a: IProduct[] = jsonData.documents.map((i: any) => ({
			id: handleSlugName(i.name),
			collectionId: i.fields.collectionId.stringValue,
			name: i.fields.name.stringValue,
			imageUrl: i.fields.imageUrl.stringValue,
			price: parseFloat(i.fields.id.integerValue),
		}));

		return a;
	}
);

export const getProductById = createAsyncThunk(
	'product/getProductById',
	async ({ id }: { id: string | undefined }, { rejectWithValue }) => {
		const api = import.meta.env.VITE_FIREBASE_API_URL as string;
		const response = await fetch(`${api}/products/${id}`);
		const jsonData = await response.json();

		if (response.status < 200 || response.status >= 300) {
			return rejectWithValue(jsonData);
		}

		const a: IProduct = {
			id: handleSlugName(jsonData.name),
			collectionId: jsonData.fields.collectionId.stringValue,
			name: jsonData.fields.name.stringValue,
			imageUrl: jsonData.fields.imageUrl.stringValue,
			price: parseFloat(jsonData.fields.price.integerValue),
			description: jsonData.fields.description?.stringValue,
		};
		return a;
	}
);

export const getProductBycollection = createAsyncThunk(
	'product/getProductBycollection',
	async (
		{ collectionId, order }: { collectionId: string | undefined, order: 'desc'| 'asc' | undefined },
		{ rejectWithValue }
	) => {
		const collectionRef = collection(db, 'products');
				const q = !order ? query(
				collectionRef,
				where('collectionId', '==', collectionId),	
			):query(
				collectionRef,
				where('collectionId', '==', collectionId),
				orderBy('price',order)
			)
			
			const querySnapshot = await getDocs(q);
			const result = querySnapshot.docs.map((doc: any) => {
				return { ...doc.data(), id: handleSlugName(doc.id) } as IProduct;
			});
			if (result) return result;
		
	
			return rejectWithValue('Product list not found');
		
	}
);

