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
  const dispatch = useDispatch();

  const onSubmitHandler = (values, { setSubmitting }) => {
    dispatch(registerUser(values))
      .then((response) => {
        if (response.payload.success) {
          props.onHide();
          alert("회원가입 되었습니다.");
        } else {
          alert("Error: " + response.payload.message); // 서버에서 전달한 오류 메시지 출력
        }
        setSubmitting(false); //formik의 submit 상태를 변경하는 메소드
        //true -> form 제출중 / false -> form 제출중이 아님
      })

      .catch((error) => {
        console.error("Server Error:", error);
        if (error.response) {
          const errorMessage = error.response.data?.message; // 서버로부터 받은 오류 메시지 정의
          if (error.response.status === 400) {
            if (errorMessage === "이미 사용중인 ID 입니다.") {
              alert("이미 사용중인 ID입니다!");
            } else if (errorMessage === "이미 사용중인 Nickname 입니다.") {
              alert("이미 사용중인 Nickname 입니다.");
            }
          } else if (
            error.response.status === 404 ||
            error.response.status === 500
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
              <div className="signup_box">
                <div className="signup_input_name">
                  <div className="signup_txt input_box">이름</div>
                  <Field
                    type="text"
                    name="signup_name"
                    className="input_name input"
                    placeholder="홍길동"
                  />
                  <ErrorMessage
                    name="signup_name"
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
                    className="error_message"
                  />
                </div>
                <div className="signup_input_gender">
                  <div className="signup_txt input_box">성별</div>
                  <RadioGroup className="input_radio input">
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
                    name="signup_id"
                    className="input_id input"
                    placeholder="영문+숫자 8자리 이상"
                  />
                  <ErrorMessage
                    name="signup_id"
                    component="div"
                    className="error_message"
                  />
                </div>
                <div className="signup_input_pw">
                  <div className="signup_txt input_box">비밀번호</div>
                  <Field
                    type="password"
                    name="signup_password"
                    className="input_pw input"
                    placeholder="영문+숫자 8자리 이상"
                  />
                  <ErrorMessage
                    name="signup_password"
                    component="div"
                    className="error_message"
                  />
                </div>
                <div className="signup_input_pw2">
                  <div className="signup_txt input_box">비밀번호 확인</div>
                  <Field
                    type="password"
                    name="signup_password2"
                    className="input_pw input"
                    placeholder="비밀번호 확인"
                  />
                  <ErrorMessage
                    name="signup_password2"
                    component="div"
                    className="error_message"
                  />
                </div>
                <div className="signup_input_id">
                  <div className="signup_txt input_box">닉네임</div>
                  <Field
                    type="text"
                    name="signup_nickname"
                    className="input_nickname input"
                    placeholder="닉네임"
                  />
                  <ErrorMessage
                    name="signup_nickname"
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
