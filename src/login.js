import "./login.css";
import React, { useState, useEffect } from "react";
import logo_img from "./assets/logo.PNG";
import axios from "axios";
import Modalsignup from "./modal_signup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  //modal state
  let [modalOpen, setModalOpen] = useState(false);

  //login 버튼 누르면
  const onClickLogin = () => {
    console.log("click login");
    console.log("ID: ", inputId);
    console.log("PW : ", inputPw);
    axios
      .post("/user_inform/onLogin", null, {
        params: {
          user_id: inputId,
          user_pw: inputPw,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("res.data.userId :: ", res.data.userId);
        console.log("res.data.msg :: ", res.data.msg);
        if (res.data.userId === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log("======================", res.data.msg);
          alert("입력하신 id 가 일치하지 않습니다.");
        } else if (res.data.userId === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log(
            "======================",
            "입력하신 비밀번호 가 일치하지 않습니다."
          );
          alert("입력하신 비밀번호 가 일치하지 않습니다.");
        } else if (res.data.userId === inputId) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log("======================", "로그인 성공");
          sessionStorage.setItem("user_id", inputId);
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/";
      })
      .catch();
  };

  useEffect(() => {
    axios
      .get("/user_inform/login")
      .then((res) => console.log(res))
      .catch();
  }, []);

  return (
    <div className="mainbox">
      <div className="home-container">
        <div className="img_box">
          <div className="img_airplane"></div>
        </div>
        <div className="login_box">
          <div className="home_box1 ">
            <img className="img_logo" src={logo_img} alt="logo"></img>
            <div className="login_form">
              <div className="home_box2 box">
                <input
                  id="login_id"
                  class="input_login"
                  type="text"
                  placeholder="user ID"
                  name="input_id"
                  value={inputId}
                  onChange={handleInputId}
                />
              </div>
              <div className="home_box2 box">
                <input
                  id="login_pw"
                  class="input_login"
                  type="password"
                  placeholder="user PW"
                  name="input_pw"
                  value={inputPw}
                  onChange={handleInputPw}
                />
              </div>
              <button
                className="btn_login"
                type="button"
                onClick={onClickLogin}
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="home_box3">
            <div>
              <Button
                id="btn_signup"
                variant="primary"
                onClick={() => {
                  setModalOpen(true);
                  console.log("click signup");
                }}
              >
                Sign up
              </Button>
              {/*회원가입 버튼*/}
              <Modalsignup
                show={modalOpen}
                onHide={() => setModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer_txt">
          ⓒ 2023. OYR_PROJECT All Rights Reserved.
        </div>
        <div className="footer_txt">OpenYearRound@naver.com</div>
      </footer>
    </div>
  );
}

export default LoginPage;
