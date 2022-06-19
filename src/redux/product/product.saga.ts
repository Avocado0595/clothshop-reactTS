//import { call, put, take, takeLatest } from 'redux-saga/effects';
import * as Effects from "redux-saga/effects";
import { createAction, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../../interfaces/IProduct';
import { fetchProduct } from '../../fetch-data/product.fetch';
import { getProductFromApi } from './product.slice';

const call:any = Effects.call;
const put:any = Effects.put;
const takeEvery = Effects.takeEvery;
export const addProductAsync = createAction('product/addProductAsync');

function* addProductSaga(action:PayloadAction<IProduct[]>) {
    
  const data:IProduct[] = yield call(fetchProduct, action.payload);
  yield put(getProductFromApi(data));
}

export function* productSaga() {
  console.log('saga');
  yield takeEvery(addProductAsync.toString(), addProductSaga);
}
