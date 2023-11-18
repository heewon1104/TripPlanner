import styles from "./login.module.css";
import React, { useState } from "react";
import logo_img from "./assets/logo.PNG";
import Modalsignup from "./modal_signup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const serverHost = 'http://localhost'; // 클라이언트와 서버가 같은 컴퓨터에서 실행되는 경우
  const loginserverPort = 81; 

  const reactNavigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
        .post(`${serverHost}:${loginserverPort}/api/login_page`, {
          user_id: values.login_id,
          user_pw: values.login_password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            sessionStorage.setItem("user_id", values.login_id);
            reactNavigate("/main");
          } else {
            if (res.data.msg === "user_id") {
              alert("입력하신 아이디가 일치하지 않습니다.");
            } else if (res.data.msg === "user_pw") {
              alert("입력하신 비밀번호가 일치하지 않습니다.");
            } else {
              alert("로그인 실패");
            }
          }
        })
        .catch((error) => {
          console.error("Server Error:", error);
          console.error(error.response.status);
          if (error.response) {
            const errorMessage = error.response.data?.message;
            if (error.response.status == 500) {
              alert("일치하는 계정이 없습니다 아이디나 비밀번호를 다시 입력해주세요!");
            } else if (
              error.response.status == 404 ||
              error.response.status == 400
            ) {
              alert("서버를 찾을 수 없습니다. 관리자에게 문의하세요.");
            } else {
              alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
          } else {
            alert(
              "서버 요청 중에 오류가 발생했습니다. 네트워크 상태를 확인하세요."
            );
          }
          setSubmitting(false);
        });
    },
  });

  return (
    <div className={styles.mainbox}>
      <div className={styles['home-container']}>
        <div className={styles['img_box']}>
          <div className={styles['img_airplane']}></div>
        </div>
        <div className={styles['login_box']}>
          <div className={`${styles['home_box1']} ${styles['box']}`}>
            <img
              className={styles['img_logo']}
              src={logo_img}
              alt="logo"
            ></img>
            <form onSubmit={formik.handleSubmit}>
              <div
                id={styles['inputbox_border']}
                className={`${styles['home_box2']} ${styles['box']}`}
              >
                <input
                  id="login_id"
                  className={styles['input_login']}
                  type="text"
                  placeholder="user ID"
                  name="login_id"
                  value={formik.values.login_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.login_id && formik.errors.login_id && (
                  <div className={styles['error_message']}>
                    {formik.errors.login_id}
                  </div>
                )}
              </div>
              <div
                id={styles['inputbox_border']}
                className={`${styles['home_box2']} ${styles['box']}`}
              >
                <input
                  id="login_pw"
                  className={styles['input_login']}
                  type="password"
                  placeholder="user PW"
                  name="login_password"
                  value={formik.values.login_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.login_password &&
                  formik.errors.login_password && (
                    <div className={styles['error_message']}>
                      {formik.errors.login_password}
                    </div>
                  )}
              </div>
              <button
                className={styles['btn_login']}
                type="submit"
                disabled={formik.isSubmitting}
              >
                Sign in
              </button>
              <div className={styles['home_box3']}>
                <div>
                  <Button
                    id={styles['btn_signup']}
                    variant="primary"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    Sign up
                  </Button>
                  <Modalsignup
                    show={modalOpen}
                    onHide={() => setModalOpen(false)}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className={styles['copyright']}>
            <div className={styles['copyright_txt']}>
              ⓒ 2023. OYR_PROJECT All Rights Reserved.
            </div>
            <div className={styles['copyright_txt']}>
              OpenYearRound@naver.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
