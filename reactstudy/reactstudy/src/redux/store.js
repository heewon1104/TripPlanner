
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

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
    case 'SET_USER_DATA':
      return { ...state, ...action.payload };
    case 'SET_USER_INFO':
      return { ...state, ...action.payload };
    // 다른 액션들 처리
    default:
      return state;
  }
};

// 미들웨어
const middleware = [promiseMiddleware, ReduxThunk];

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const checkSessionExpiration = () => {
  const serializedState = sessionStorage.getItem('reduxState');
  if (serializedState === null) {
    return null; // 세션이 없으면 null 반환
  }

  try {
    const state = JSON.parse(serializedState);

    // 만료 시간 확인 (1시간 기준)
    const expirationTime = Date.now() + (1 * 10); // 토큰의 만료 시간
    const currentTime = Date.now(); // 현재 시간

    console.log("시간 :" , expirationTime, currentTime);

    if (currentTime > expirationTime) {
      return null; // 토큰이 만료되었으면 null 반환
    }

    return state;
  } catch (err) {
    return null; // 파싱 에러 시도 시 null 반환
  }
};



const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // 에러 처리 로직 추가
  }
};

// 스토어 생성 시 세션 스토리지에서 상태 로드
const reduxStore = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(...middleware)
);

// 상태가 변경될 때마다 세션 스토리지에 저장
reduxStore.subscribe(() => {
  saveState(reduxStore.getState());
});

export default reduxStore;

