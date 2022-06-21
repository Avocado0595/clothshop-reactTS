- 0. chỉnh giao diện: add bootstrap, reactstrap
- 1. custom báo lỗi login
    + khi input lỗi => báo lỗi (Alert reactstrap)
    + input mới => tắt lỗi (onChange Form)
    + input khi chọn autocomplete bị đổi màu: https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete
    + bật box shdow khi autocomplete đỏi màu nên đường viền input bị che (ban đàu làm bằng box-shadow)=> đổi lại thành border-bottom
    + 2 nút login và login gg bị dính khi responsive: 
- 2. Add responsive bootstrap:
- 3. reload, navigate signin, signup chậm?????

### FIREBASE BASIC

 -query: request => firestore => get data in 2 types: references and snapshots
1. QueryReference: represents the current place in database that querying
- call: firestore.doc('/users/userId') or firestore.collection('/users')
- do not have actual data => use snapshot to get data
- use DocumentReference for CRUD: .set(), .get(), .update(), .delete(), .add()
- get snapshot: 
    + documentRef.get(), documentSnapshot
    + collectionRef.get(), querySnapshot

2. documentSnapshot: 
-  check doc is exist: .exists
-  get props: .data()
3. HOC cho loading, (nhưng mà làm HOC cho singin, làm component này reload, mất message erorr ??),

4. Observation Pattern: inAuthStateChanged(function(){})
   - inAuthStateChanged: lắng nghe sự kiện, giữ kết nối từ client đến server (khi client đăng nhập, đăng xuất)
   - function(){}: nextFunction()=> thực thi khi inAuthStateChanged dc gọi
   - lưu ý ở hook useEffect có return hàm này là để hủy connect đến firebase khi component này mất đi.
5. get api -> get ở layout component => không cần thiết => redux-thunk (dĩ nhiên là ko gọi trong reducer dc vì get api là async, còn reducer chỉ nhận pure function)
6. chỉnh sửa việc gọi api product tại route cần load, ko gọi những nơi không cần @@ mà cái này cần gọi hết
7. Redux Saga
+ redux-thunk: middleware xử lý async:
    - hàm xử lý async
    - createAsyncThunk(tên action, hàm xử lý async=>return data)
    - gọi reducer thunk bằng extraReducers
    - dispatch(hàm xử lý async) =>gọi extraReducers
+ Generator function
```js
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```
+ use middleware as callback: ``middleware: (getDefaultMiddleware)=>  [...getDefaultMiddleware({thunk: false}), sagaMiddleware]``
+ 
### Hướng dẫn redux-saga với typescript
1. install redux-saga: ``npm i redux-saga``, ``npm i -D @types/redux-saga``
2. Config saga với action
```ts
import { createAction, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../../interfaces/IProduct';
import { fetchProduct } from '../../fetch-data/product.fetch';//hàm fetch data từ api
import { getProductFromApi } from './product.slice';//reducer add data vào state của product
//import { call, put, take, takeLatest } from 'redux-saga/effects';
//thay vì import trên này thì
import * as Effects from "redux-saga/effects";
//sau đó cast type cho any để ko bị báo lỗi
const call:any = Effects.call;
const put:any = Effects.put;
const takeEvery = Effects.takeEvery;
//tạo action
export const addProductAsync = createAction('product/addProductAsync');
//tạo 1 reducer là generator function để call hàm async
function* addProductSaga(action:PayloadAction<IProduct[]>) {
  //call: gọi tới 1 hàm async,trả về 1 hàm promise, chờ hàm này thực thi xong
  const data:IProduct[] = yield call(fetchProduct, action.payload);
  //call thực thi xong, sẽ thực hiện put: dispatch 1 action của reducer bên slice
  yield put(getProductFromApi(data));
}
//export saga vừa tạo
export function* productSaga() {
  //takeEvery(action.type, reducer): thực hiện khi gọi action.type tương ứng
  yield takeEvery(addProductAsync.toString(), addProductSaga);
}
```
3. Tạo rootSaga: gom các saga khác nhau về
```ts
import { all } from 'redux-saga/effects';
import { productSaga } from './product/product.saga';

export default function* rootSaga() {
  yield all([productSaga()]);//thực thi các saga song song
}
```
4. Add saga vào middleware của store
```ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
//const middleware = (getDefaultMiddleware)=>  [...getDefaultMiddleware(), sagaMiddleware];

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware)=>  [...getDefaultMiddleware({thunk: false, serializableCheck: false,}), sagaMiddleware]
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
```
5. gọi saga này khi cần: ``dispatch(addProductAsync());``