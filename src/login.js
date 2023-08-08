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
    inputId: Yup.string().required("아이디를 입력하세요."),
    inputPw: Yup.string().required("비밀번호를 입력하세요."),
  });

  const formik = useFormik({
    initialValues: {
      inputId: "",
      inputPw: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Form Values:", values);
      if (!values.inputId || !values.inputPw) {
        alert("아이디와 비밀번호를 입력해주세요.");
        setSubmitting(false);
        return;
      }
      axios
        .post("/", null, {
          params: {
            user_id: values.inputId,
            user_pw: values.inputPw,
          },
        })
        .then((res) => {
          console.log(res);
          console.log("res.data.userId :: ", res.data.userId);
          console.log("res.data.msg :: ", res.data.msg);
          if (res.data.userId === undefined) {
            alert("입력하신 id 가 일치하지 않습니다.");
          } else if (res.data.userId === null) {
            alert("입력하신 비밀번호 가 일치하지 않습니다.");
          } else if (res.data.userId === values.inputId) {
            sessionStorage.setItem("user_id", values.inputId);
          }
          // 작업 완료 되면 페이지 이동(새로고침)
          document.location.href = "/main";
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
                  name="inputId"
                  value={formik.values.inputId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.inputId && formik.errors.inputId && (
                  <div className="error_message">{formik.errors.inputId}</div>
                )}
              </div>
              <div id="inputbox_border" className="home_box2 box">
                <input
                  id="login_pw"
                  className="input_login"
                  type="password"
                  placeholder="user PW"
                  name="inputPw"
                  value={formik.values.inputPw}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.inputPw && formik.errors.inputPw && (
                  <div className="error_message">{formik.errors.inputPw}</div>
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
