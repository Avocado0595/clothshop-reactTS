import { createAsyncThunk } from "@reduxjs/toolkit";
import ICollection from "../../interfaces/ICollection";

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
        id:parseInt(i.fields.id.integerValue), 
        routeName: i.fields.routeName.stringValue,
        imageUrl: i.fields.imageUrl.stringValue}));
      return a;
    }
  );
