import "./login.css";
import React, { useState } from "react";
import logo_img from "./assets/logo.PNG";
import Modalsignup from "./modal_signup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginPage() {
  //  modal state - 회원가입창
  let [modalOpen, setModalOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    login_id: Yup.string().required("아이디를 입력하세요."),
    login_password: Yup.string().required("비밀번호를 입력하세요."),
  });

  const formik = useFormik({
    initialValues: {
      login_id: "",
      login_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Form Values:", values);
      if (!values.login_id || !values.login_password) {
        alert("아이디와 비밀번호를 입력해주세요.");
        setSubmitting(false);
        return;
      }
      axios
        .post("/", null, {
          params: {
            user_id: values.login_id,
            user_pw: values.login_password,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            // 로그인 성공 처리
            sessionStorage.setItem("user_id", values.login_id);
            window.location.href = "/main"; // 로그인 성공 시 메인 페이지로 이동
          } else {
            // 로그인 실패 처리
            if (res.data.msg === "user_id") {
              alert("입력하신 아이디가 일치하지 않습니다.");
            } else if (res.data.msg === "user_pw") {
              alert("입력하신 비밀번호가 일치하지 않습니다.");
            } else {
              alert("로그인 실패");
            }
          }
        })
        .catch()
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="mainbox">
      <div className="home-container">
        <div className="img_box">
          <div className="img_airplane"></div>
        </div>
        <div className="login_box">
          <div className="home_box1 ">
            <img className="img_logo" src={logo_img} alt="logo"></img>
            <form onSubmit={formik.handleSubmit}>
              <div id="inputbox_border" className="home_box2 box">
                <input
                  id="login_id"
                  className="input_login"
                  type="text"
                  placeholder="user ID"
                  name="login_id"
                  value={formik.values.login_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.login_id && formik.errors.login_id && (
                  <div className="error_message">{formik.errors.login_id}</div>
                )}
              </div>
              <div id="inputbox_border" className="home_box2 box">
                <input
                  id="login_pw"
                  className="input_login"
                  type="password"
                  placeholder="user PW"
                  name="login_password"
                  value={formik.values.login_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.login_password &&
                  formik.errors.login_password && (
                    <div className="error_message">
                      {formik.errors.login_password}
                    </div>
                  )}
              </div>
              <button
                className="btn_login"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Sign in
              </button>
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
            </form>
          </div>

          <div className="copyright">
            <div className="copyright_txt">
              ⓒ 2023. OYR_PROJECT All Rights Reserved.
            </div>
            <div className="copyright_txt">OpenYearRound@naver.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
