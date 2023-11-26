import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

// 초기 상태
const initialState = {
  signup_name: null,
  signup_birth: null,
  signup_gender: null,
  signup_id: null,
  signup_nickname: null,
};

// 리듀서 함수
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, ...action.payload };
    case "SET_USER_INFO":
      return { ...state, ...action.payload };
    // 다른 액션들 처리
    default:
      return state;
  }
};

// 미들웨어
const middleware = [promiseMiddleware, ReduxThunk];

// 스토어 생성
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
