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
