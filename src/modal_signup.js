import React from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // 유효성 검사를 위한 Yup 라이브러리 사용
import "react-datepicker/dist/react-datepicker.css";
import { RadioGroup } from "./RadioGroup";
import { useDispatch } from "react-redux";
import { registerUser } from "./action_user";
import simple_logo_img from "./assets/simple_logo.PNG";
import styles from "./modal_signup.module.css";

const idAndPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //숫자+영문인지 확인하는 코드

const validationSchema = Yup.object().shape({
  signup_name: Yup.string().required("이름을 입력해주세요."),
  signup_birth: Yup.date().required("생년월일을 선택해주세요."),
  signup_gender: Yup.string().required("성별을 선택해주세요."),
  // validationSchema 내부의 signup_id 및 signup_pw 유효성 검사 코드 수정
  signup_id: Yup.string()
    .required("아이디를 입력해주세요.")
    .matches(idAndPasswordRegex, "영문+숫자 8자리 이상 입력하세요."),

  signup_password: Yup.string()
    .required("비밀번호를 입력해주세요.")
    .matches(idAndPasswordRegex, "영문+숫자 8자리 이상 입력하세요."),

  signup_password2: Yup.string()
    .required("비밀번호 확인을 입력해주세요.")
    .oneOf([Yup.ref("signup_password"), null], "비밀번호가 일치하지 않습니다."),

  signup_nickname: Yup.string().required("닉네임을 입력해주세요."),
});

function Modalsignup(props) {
  const serverHost = "http://localhost"; // 클라이언트와 서버가 같은 컴퓨터에서 실행되는 경우
  const loginserverPort = 81;
  const signupserverPort = 80;

  const onSubmitHandler = (values, { setSubmitting }) => {
    //console.log("Submitted Form Values:", values);

    fetch(`${serverHost}:${signupserverPort}/api/signup_page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        console.log("Server Response:", response);
        if (response.ok) {
          props.onHide();
          alert("회원가입 되었습니다.");
        } else if (response) {
          if (response.status === 400) {
            alert("이미 사용중인 ID입니다!");
          } else if (response.status === 401) {
            alert("이미 사용중인 Nickname 입니다.");
          } else if (response.status === 404 || response.status === 500) {
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
      })

      .catch((error) => {
        console.error("Server Error:", error);
        setSubmitting(false);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <img
          className={styles.simple_logo}
          src={simple_logo_img}
          alt="simple_logo"
        ></img>
        <Modal.Title id="contained-modal-title-vcenter">회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            signup_name: "",
            signup_birth: null,
            signup_gender: "",
            signup_id: "",
            signup_password: "",
            signup_password2: "",
            signup_nickname: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              {/* 개인정보 입력 칸 */}
              <div className={styles.signup_box}>
                <div className={styles.signup_input_name}>
                  <div className={`${styles.signup_txt} ${styles.input_box}`}>
                    이름
                  </div>
                  <Field
                    type="text"
                    name="signup_name"
                    className={`${styles.input_name} ${styles.input}`}
                    placeholder="홍길동"
                  />
                  <ErrorMessage
                    name="signup_name"
                    component="div"
                    className={styles.error_message}
                  />
                </div>
                <div className={styles.signup_input_birth}>
                  <div className={`${styles.signup_txt} ${styles.input_box}`}>
                    생년월일
                  </div>
                  <Field
                    id="signup_birth"
                    className={`${styles.input_birth} ${styles.input}`}
                    type="date"
                    max="2009-07-12"
                    value={values.signup_birth || ""} //빈 문자열로 초기화
                    onChange={(e) =>
                      setFieldValue("signup_birth", e.target.value)
                    }
                    placeholder="날짜를 선택하세요"
                  />
                  <ErrorMessage
                    name="signup_birth"
                    component="div"
                    className={styles.error_message}
                  />
                </div>
                <div className={styles.signup_input_gender}>
                  <div className={`${styles.input_name} ${styles.input}`}>
                    성별
                  </div>
                  <RadioGroup
                    className={`${styles.input_radio} ${styles.input}`}
                  >
                    <Field
                      id="radio_btn_1"
                      type="radio"
                      name="signup_gender"
                      value="man"
                    />
                    <label htmlFor="radio_btn">남자</label>
                    <Field
                      id="radio_btn_2"
                      type="radio"
                      name="signup_gender"
                      value="woman"
                    />
                    <label htmlFor="radio_btn">여자</label>
                  </RadioGroup>
                  <ErrorMessage
                    name="signup_gender"
                    component="div"
                    className={styles.error_message}
                  />
                </div>
              </div>
              {/* 아이디 및 비밀번호 입력 칸 */}
              <div className={styles.signup_box}>
                <div className={styles.signup_input_id}>
                  <div className={`${styles.input_name} ${styles.input}`}>
                    아이디
                  </div>
                  <Field
                    type="text"
                    name="signup_id"
                    className={`${styles.input_id} ${styles.input}`}
                    placeholder="영문+숫자 8자리 이상"
                  />
                  <ErrorMessage
                    name="signup_id"
                    component="div"
                    className={styles.error_message}
                  />
                </div>
                <div className={styles.signup_input_pw}>
                  <div className={`${styles.input_name} ${styles.input}`}>
                    비밀번호
                  </div>
                  <Field
                    type="password"
                    name="signup_password"
                    className={`${styles.input_pw} ${styles.input}`}
                    placeholder="영문+숫자 8자리 이상"
                  />
                  <ErrorMessage
                    name="signup_password"
                    component="div"
                    className={styles.error_message}
                  />
                </div>
                <div className={styles.signup_input_pw2}>
                  <div className={`${styles.input_name} ${styles.input}`}>
                    비밀번호 확인
                  </div>
                  <Field
                    type="password"
                    name="signup_password2"
                    className={`${styles.input_pw} ${styles.input}`}
                    placeholder="비밀번호 확인"
                  />
                  <ErrorMessage
                    name="signup_password2"
                    component="div"
                    className={styles.error_message}
                  />
                </div>
                <div className={styles.signup_input_nickname}>
                  <div className={`${styles.input_name} ${styles.input}`}>
                    닉네임
                  </div>
                  <Field
                    type="text"
                    name="signup_nickname"
                    className={`${styles.input_nickname} ${styles.input}`}
                    placeholder="닉네임"
                  />
                  <ErrorMessage
                    name="signup_nickname"
                    component="div"
                    className={styles.error_message}
                  />
                </div>
              </div>
              <div className={styles.btn_signup}>
                <button
                  id="btn_signup_ok"
                  type="submit"
                  disabled={isSubmitting}
                >
                  가입하기
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer className={styles.footer}></Modal.Footer>
    </Modal>
  );
}

export default Modalsignup;
