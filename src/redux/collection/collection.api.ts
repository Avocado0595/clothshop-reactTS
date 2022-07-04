import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import ICollection from "./collection.interface";
import {db} from '../../firebase/firebase.utils';
export const getCollectionList = createAsyncThunk(
    'collection/getCollectionList',
    async (data, { rejectWithValue }) => {
      const api = import.meta.env.VITE_FIREBASE_API_URL as string;
      const response = await fetch(`${api}/collections?pageSize=5`);

      const jsonData = await response.json();
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(jsonData);
      }
      const a:ICollection[] = jsonData.documents.map((i:any)=>({
        title: i.fields.title.stringValue,
        id:i.fields.name, 
        routeName: i.fields.routeName.stringValue,
        imageUrl: i.fields.imageUrl.stringValue}));
      return a;
    }
  );

  export const getCollectionByTitle = createAsyncThunk(
    'collection/getCollectionByTitle',
    async ({title}:{title:string|undefined}, { rejectWithValue }) => {
      const collectionRef = collection(db, "collections");
      const q = query(collectionRef, where("title", "==", title?.toLowerCase()));
      const querySnapshot = await getDocs(q);
      const result = {...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id} as ICollection;
      if(result)
        return result;
      return rejectWithValue('Collection not found');
    }
);

export const getCollectionById = createAsyncThunk(
  'collection/getCollectionById',
  async ({id}:{id:string|undefined}, { rejectWithValue }) => {
    const api = import.meta.env.VITE_FIREBASE_API_URL as string;
    const response = await fetch(`${api}/collections/${id}`);

    const jsonData = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData);
    }
    const a:ICollection = {
      title: jsonData.fields.title.stringValue,
      id:jsonData.fields.name, 
      routeName: jsonData.fields.routeName.stringValue,
      imageUrl: jsonData.fields.imageUrl.stringValue};
    return a;
  }
);