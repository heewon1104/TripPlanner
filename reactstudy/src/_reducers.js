import { combineReducers } from "redux";
import userReducer from "./user_reducer"; // user_reducer 파일로부터 user 리듀서를 불러옴

const rootReducer = combineReducers({
  user: userReducer, // user 리듀서를 포함시킴
});

export default rootReducer;
