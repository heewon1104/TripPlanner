import axios from 'axios';
import reduxStore from './store'; // store 변수의 이름 변경

const serverHost = 'http://13.239.138.191';
const serverPort = 82;

export const setUserInfo = (userInfo) => ({
  type: 'SET_USER_INFO',
  payload: userInfo,
});

export const fetchUserInfo = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${serverHost}:${serverPort}/api/user_info`, {
        user_id: userId,
      });
      const userInfo = response.data[0];

      userInfo.signup_password = "---------";
      userInfo.signup_password2 = "---------";

      // store 변수 대신에 reduxStore를 사용
      dispatch(setUserInfo(userInfo));

    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
};

export const getUserInfo = (userId) => {
  return reduxStore.getState();
}


// export const handleSessionExpiration = () => {
//   const isSessionExpired = checkSessionExpiration() === null;

//   if (isSessionExpired) {
//     // 세션 만료 시 사용자 정보 초기화
//     const nullUserInfo = {
//       signup_name: null,
//       signup_birth: null,
//       signup_gender: null,
//       signup_id: null,
//       signup_nickname: null,
//     };

//     // store 변수 대신에 reduxStore를 사용
//     reduxStore.dispatch(setUserInfo(nullUserInfo));

//     console.log("Session expired. User info reset.");
//   }
// };
