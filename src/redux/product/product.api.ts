import { createAsyncThunk } from "@reduxjs/toolkit";
import handleSlugName from "../../helpers/handleSlugName";
import IProduct from "../../interfaces/IProduct";

export const getProductList = createAsyncThunk(
    'product/getProductList',
    async (data, {rejectWithValue}) => {
      const api = import.meta.env.VITE_FIREBASE_API_URL as string;
      const response = await fetch(`${api}/products?pageSize=50`);
      const jsonData = await response.json();

      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(jsonData);
      }
      
      const a:IProduct[] = jsonData.documents.map((i:any)=>({
        id: handleSlugName(i.name),
        collectionId: parseInt(i.fields.collectionId.integerValue),
        name: i.fields.name.stringValue,
        imageUrl: i.fields.imageUrl.stringValue,
        price: parseInt(i.fields.id.integerValue)
    }));

      return a;
    }
  );

export const getProductById = createAsyncThunk(
    'product/getProductById',
    async ({id}:{id:string|undefined}, {rejectWithValue}) => {
      const api = import.meta.env.VITE_FIREBASE_API_URL as string;
      const response = await fetch(`${api}/products/${id}`);
      const jsonData = await response.json();
      
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(jsonData);
      }
      try{
        const a:IProduct = {
          id: handleSlugName(jsonData.name),
          collectionId: parseInt(jsonData.fields.collectionId.integerValue),
          name: jsonData.fields.name.stringValue,
          imageUrl: jsonData.fields.imageUrl.stringValue,
          price: parseInt(jsonData.fields.price.integerValue),
          description: jsonData.fields.description?.stringValue 
        }
        return a;
      }
      catch(e){
        console.log(e)
      }
      //console.log(a);
      
    }
  );
