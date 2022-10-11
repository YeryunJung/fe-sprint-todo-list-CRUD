// import { createStore } from "redux";
// import { reducer } from "./reducer";
// import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // localstorage를 사용할 것이라고 알려주는것

// // 리덕스 스토어에 reducer를 넣어주는 작업
// const store = createStore(reducer);

// // persist를 적용하기 앞서 스토리지에 저장하고자 하는 내역에 대해 설정
// const persistConfig = {
//   // reducer 객체의 어느 지점에서 부터 데이터를 저장할 것인지 설정해주는것
//   key: "root",
//   storage: storage,
//   whitelist: ["todo"],
// };

// export default store;

// const rootReducer = combineReducers({});

import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../slices/todoSlices";

const store = configureStore({
  reducer: {
    //todo Reducer
    todo: todoSlice,
  },
});

export default store;
