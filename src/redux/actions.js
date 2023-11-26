import axios from "axios";
import store from "./store";

const serverHost = "http://localhost"; // 클라이언트와 서버가 같은 컴퓨터에서 실행되는 경우
const serverPort = 80;

export const setUserInfo = (userInfo) => ({
  type: "SET_USER_INFO",
  payload: userInfo,
});

export const fetchUserInfo = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${serverHost}:${serverPort}/api/user_info`,
        {
          user_id: userId,
        }
      );
      const userInfo = response.data[0];

      userInfo.signup_password = "————";
      userInfo.signup_password2 = "————";

      dispatch(setUserInfo(userInfo));

      console.log("Current User Info At redux:", userInfo);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
};

export const getUserInfo = (userId) => {
  console.log("Redux State after setUserInfo:", store.getState());
  return store.getState();
};
