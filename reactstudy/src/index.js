import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from './redux/store';

// Importing checkSessionExpiration from the redux store
import { checkSessionExpiration } from './redux/store';

const Root = () => {
  useEffect(() => {
    // 세션 만료 여부 확인
    const expiredSession = checkSessionExpiration();

    if (expiredSession === null) {
      // 세션이 만료되었으면, 초기 상태로 리덕스 스토어 업데이트
      store.dispatch({
        type: 'SET_USER_INFO',
        payload: {
          signup_name: null,
          signup_birth: null,
          signup_gender: null,
          signup_id: null,
          signup_nickname: null,
        },
      });

      console.log("세션이 만료되었습니다.");
    }
  }, []); // componentDidMount와 같은 역할을 하는 useEffect

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

createRoot(document.getElementById("root")).render(<Root />);
reportWebVitals();
