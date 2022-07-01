import { createAsyncThunk } from "@reduxjs/toolkit";
import IProduct from "../../interfaces/IProduct";

export const getProductList = createAsyncThunk(
    'product/getProductList',
    async (data, { rejectWithValue }) => {
      const api = import.meta.env.VITE_FIREBASE_API_URL as string;
      const response = await fetch(`${api}/products?pageSize=50`);
      const jsonData = await response.json();

      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(jsonData);
      }
      const a:IProduct[] = jsonData.documents.map((i:any)=>({
        id:parseInt(i.fields.id.integerValue),
        collectionId: parseInt(i.fields.collectionId.integerValue),
        name: i.fields.name.stringValue,
        imageUrl: i.fields.imageUrl.stringValue,
        price: parseInt(i.fields.id.integerValue)
    }));
      return a;
    }
  );
