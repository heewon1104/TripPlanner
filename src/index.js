import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkit의 configureStore 사용
import rootReducer from "./_reducers";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import store from "./redux/store";

// Redux Store 생성
const reduxStore = configureStore({
  reducer: rootReducer,
  // middleware: [promiseMiddleware, ReduxThunk], // 필요에 따라 middleware를 여기서 설정
  // devTools: process.env.NODE_ENV !== "production", // 개발 환경에서만 DevTools 활성화
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
