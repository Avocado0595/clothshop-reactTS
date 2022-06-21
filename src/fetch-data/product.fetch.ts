import { createAsyncThunk } from "@reduxjs/toolkit";
import IProduct from "../interfaces/IProduct";

export async function fetchProduct(){
  const response = await fetch('https://firestore.googleapis.com/v1/projects/clothshop-b6cc2/databases/(default)/documents/products?pageSize=100');
  
      // Convert dữ liệu ra json
      const jsonData = await response.json();
  
      // Nếu bị lỗi thì reject
      if (response.status < 200 || response.status >= 300) {
        return null;
      }
      const a:IProduct[] = jsonData.documents.map((i:any)=>({
        id:parseInt(i.fields.id.integerValue), collectionId: parseInt(i.fields.collectionId.integerValue),
        name: i.fields.name.stringValue, imageUrl: i.fields.imageUrl.stringValue,price: parseInt(i.fields.id.integerValue)
    }));
      // Còn không thì trả về dữ liệu
      console.log(a);
      return a;
}
// createAsyncThunk(
//     // Tên action
//     'product/fetch',
  
//     // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
//     async (data, { rejectWithValue }) => {
//       // Gọi lên API backend
//       const response = await fetch('https://firestore.googleapis.com/v1/projects/clothshop-b6cc2/databases/(default)/documents/products?pageSize=100');
  
//       // Convert dữ liệu ra json
//       const jsonData = await response.json();
  
//       // Nếu bị lỗi thì reject
//       if (response.status < 200 || response.status >= 300) {
//         return rejectWithValue(jsonData);
//       }
//       const a:IProduct[] = jsonData.documents.map((i:any)=>({
//         id:parseInt(i.fields.id.integerValue), collectionId: parseInt(i.fields.collectionId.integerValue),
//         name: i.fields.name.stringValue, imageUrl: i.fields.imageUrl.stringValue,price: parseInt(i.fields.id.integerValue)
//     }));
//       // Còn không thì trả về dữ liệu
//       return a;
//     }
//   );