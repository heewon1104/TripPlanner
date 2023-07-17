import simple_logo_img from "./assets/simple_logo.PNG";
import "./modal_signup.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Radio, RadioGroup } from "./RadioGroup";

function Modalsignup(props) {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <Modal
      {...props}
      sige="lg"
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
        {/*개인정보 입력 칸*/}
        <div className="signup_box">
          <div className="signup_input_name">
            <div className="signup_txt input_box">이름</div>
            <input
              id="signup_name"
              className="input_name input"
              type="text"
              placeholder="홍길동"
              name="signup_name"
            />
          </div>
          <div className="signup_input_birth">
            <div className="signup_txt input_box">생년월일</div>
            <DatePicker
              id="signup_birth"
              className="input_birth input"
              dateFormat={"yyyy.MM.dd"}
              shouldCloseOnSelect //선택하면 자동닫힘
              maxDate={new Date("2009-7-12")} //만 14세 미만 가입 불가
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText={"날짜를 선택하세요"}
            />
          </div>
          <div className="signup_input_gender">
            <div className="signup_txt input_box">성별</div>
            <RadioGroup className="input_radio input">
              <Radio id="radio_btn" name="gender" value="man" defaultChecked>
                남자
              </Radio>
              <Radio id="radio_btn" name="gender" value="woman">
                여자
              </Radio>
            </RadioGroup>
          </div>
        </div>
        {/*아이디 및 비밀번호 입력 칸*/}
        <div className="signup_box">
          <div className="signup_input_id">
            <div className="signup_txt input_box">아이디</div>
            <input
              id="signup_id"
              className="input_id input"
              type="text"
              placeholder="영문+숫자 8자리 이상"
              name="signup_id"
            />
          </div>
          <div className="signup_input_pw">
            <div className="signup_txt input_box">비밀번호</div>
            <input
              id="signup_pw"
              className="input_pw input"
              type="text"
              placeholder="영문+숫자 8자리 이상"
              name="signup_pw"
            />
          </div>
          <div className="signup_input_pw2">
            <div className="signup_txt input_box">비밀번호 확인</div>
            <input
              id="signup_pw2"
              className="input_pw input"
              type="text"
              placeholder="비밀번호"
              name="signup_pw2"
            />
          </div>
          <div className="signup_input_id">
            <div className="signup_txt input_box">닉네임</div>
            <input
              id="signup_nickname"
              className="input_nickname input"
              type="text"
              placeholder="닉네임"
              name="signup_nickname"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          id="btn_signup_ok"
          onClick={() => alert("회원가입 되었습니다! 로그인 후 이용해주세요.")}
        >
          가입하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Modalsignup;
