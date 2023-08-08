import React from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // 유효성 검사를 위한 Yup 라이브러리 사용
import "react-datepicker/dist/react-datepicker.css";
import { RadioGroup } from "./RadioGroup";
import { useDispatch } from "react-redux";
import { registerUser } from "./action_user";

import simple_logo_img from "./assets/simple_logo.PNG";
import "./modal_signup.css";

const idAndPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //숫자+영문인지 확인하는 코드
const isNotBlank = (value) => {
  return value.trim() !== "";
}; //아이디 비밀번호 공백확인 코드

const validationSchema = Yup.object().shape({
  name: Yup.string().required("이름을 입력해주세요."),
  birth: Yup.date().required("생년월일을 선택해주세요."),
  gender: Yup.string().required("성별을 선택해주세요."),
  // validationSchema 내부의 user_id 및 user_pw 유효성 검사 코드 수정
  user_id: Yup.string()
    .test("isNotBlank", "아이디를 입력해주세요.", isNotBlank)
    .matches(idAndPasswordRegex, "영문+숫자 8자리 이상 입력하세요.")
    .required("아이디를 입력해주세요."),

  user_pw: Yup.string()
    .test("isNotBlank", "비밀번호를 입력해주세요.", isNotBlank)
    .matches(idAndPasswordRegex, "영문+숫자 8자리 이상 입력하세요.")
    .required("비밀번호를 입력해주세요."),

  user_pw2: Yup.string()
    .test("isNotBlank", "비밀번호 확인을 입력해주세요.", isNotBlank)
    .oneOf([Yup.ref("user_pw"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요."),

  nickname: Yup.string().required("닉네임을 입력해주세요."),
});

function Modalsignup(props) {
  const dispatch = useDispatch();

  const onSubmitHandler = (values, { setSubmitting }) => {
    console.log("Submitted Form Values:", values);
    dispatch(registerUser(values)).then((response) => {
      if (response.payload.success) {
        props.history.push("/");
      } else {
        alert("Error");
      }
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
          className="simple_logo"
          src={simple_logo_img}
          alt="simple_logo"
        ></img>
        <Modal.Title id="contained-modal-title-vcenter">회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
            birth: null,
            gender: "",
            user_id: "",
            user_pw: "",
            user_pw2: "",
            nickname: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              {/* 개인정보 입력 칸 */}
              <div className="signup_box">
                <div className="signup_input_name">
                  <div className="signup_txt input_box">이름</div>
                  <Field
                    type="text"
                    name="name"
                    className="input_name input"
                    placeholder="홍길동"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error_message"
                  />
                </div>
                <div className="signup_input_birth">
                  <div className="signup_txt input_box">생년월일</div>
                  <Field
                    id="signup_birth"
                    className="input_birth input"
                    type="date"
                    dateFormat="yyyy.MM.dd"
                    shouldCloseOnSelect
                    maxDate={new Date("2009-07-12")}
                    selected={values.birth}
                    onChange={(date) => setFieldValue("birth", date)}
                    placeholderText="날짜를 선택하세요"
                  />
                  <ErrorMessage
                    name="birth"
                    component="div"
                    className="error_message"
                  />
                </div>
                <div className="signup_input_gender">
                  <div className="signup_txt input_box">성별</div>
                  <RadioGroup className="input_radio input">
                    <Field
                      id="radio_btn_1"
                      type="radio"
                      name="gender"
                      value="man"
                    />
                    <label htmlFor="radio_btn">남자</label>
                    <Field
                      id="radio_btn_2"
                      type="radio"
                      name="gender"
                      value="woman"
                    />
                    <label htmlFor="radio_btn">여자</label>
                  </RadioGroup>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="error_message"
                  />
                </div>
              </div>
              {/* 아이디 및 비밀번호 입력 칸 */}
              <div className="signup_box">
                <div className="signup_input_id">
                  <div className="signup_txt input_box">아이디</div>
                  <Field
                    type="text"
                    name="user_id"
                    className="input_id input"
                    placeholder="영문+숫자 8자리 이상"
                  />
                  <ErrorMessage
                    name="user_id"
                    component="div"
                    className="error_message"
                  />
                </div>
                <div className="signup_input_pw">
                  <div className="signup_txt input_box">비밀번호</div>
                  <Field
                    type="password"
                    name="user_pw"
                    className="input_pw input"
                    placeholder="영문+숫자 8자리 이상"
                  />
                  <ErrorMessage
                    name="user_pw"
                    component="div"
                    className="error_message"
                  />
                </div>
                <div className="signup_input_pw2">
                  <div className="signup_txt input_box">비밀번호 확인</div>
                  <Field
                    type="password"
                    name="user_pw2"
                    className="input_pw input"
                    placeholder="비밀번호 확인"
                  />
                  <ErrorMessage
                    name="user_pw2"
                    component="div"
                    className="error_message"
                  />
                </div>
                <div className="signup_input_id">
                  <div className="signup_txt input_box">닉네임</div>
                  <Field
                    type="text"
                    name="nickname"
                    className="input_nickname input"
                    placeholder="닉네임"
                  />
                  <ErrorMessage
                    name="nickname"
                    component="div"
                    className="error_message"
                  />
                </div>
              </div>
              <div className="btn_signup">
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
      <Modal.Footer className="footer"></Modal.Footer>
    </Modal>
  );
}

export default Modalsignup;
