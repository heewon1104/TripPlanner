import { LOGIN_USER, REGISTER_USER } from "./types";

const initialState = {
  userData: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, userData: action.payload };
    case REGISTER_USER:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
