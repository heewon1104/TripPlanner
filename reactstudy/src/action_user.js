import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";

const serverHost = "http://13.239.138.191"; // 클라이언트와 서버가 같은 컴퓨터에서 실행되는 경우
const loginserverPort = 81; 
const signupserverPort = 82; 


export function loginUser(dataToSubmit) {
  fetch(`${serverHost}:${loginserverPort}/api/login_page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSubmit),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then((result) => {
      //console.log('데이터 전송 성공:', result);
    })
    .catch((error) => {
      console.error('데이터 전송 오류:', error);
    });
}


export function registerUser(dataToSubmit) {
  fetch(`${serverHost}:${signupserverPort}/api/signup_page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSubmit), 
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); 
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then((result) => {
      //console.log('데이터 전송 성공:', result);
    })
    .catch((error) => {
      if(error == "Error: Network response was not ok")
        console.log("true");
      else
      console.log(error);
      console.error('데이터 전송 오류:', error);
    });
}


