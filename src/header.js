import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "./redux/actions.js";

function Header() {
  const [userNickname, setUserNickname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버에서 사용자 정보 가져오기
        const userInfoResponse = await getUserInfo(); // fetchUserInfo는 사용자 정보를 서버에서 가져오는 액션입니다.

        // 사용자 정보에서 닉네임 추출
        const userNicknameFromServer = userInfoResponse.signup_nickname;

        setUserNickname(userNicknameFromServer);
      } catch (error) {
        console.error("데이터를 불러오는 동안 오류가 발생했습니다.", error);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();

  const handleLogout = async () => {
    // 로그아웃 확인 알람 창
    const shouldLogout = window.confirm("로그아웃 하시겠습니까?");

    if (shouldLogout) {
      // 로그아웃 로직
      try {
        const response = await fetch("http://localhost:80/api/logout", {
          method: "POST",
          credentials: "include", // 쿠키 정보도 같이 보냄
          headers: {
            "Content-Type": "application/json",
          },
        });

        // 요청이 성공한 경우에만 알림을 표시
        if (response.ok) {
          alert("로그아웃 되었습니다.");
          navigate("/"); // 로그아웃 후 로그인 페이지로 이동
        } else {
          // 오류 처리
          console.error("로그아웃 실패");
        }
      } catch (error) {
        // 네트워크 또는 기타 오류 처리
        console.error("로그아웃 중 오류 발생:", error);
      }
    }
  };

  const handleHomeClick = () => {
    navigate("/main");
  };

  const handlePlannerClick = () => {
    navigate("/schedule");
  };

  const handleExpensesClick = () => {
    navigate("/expense");
  };

  // const handleTourismClick = () => {
  //   navigate("/tourism");
  // };

  const handleCommunityClick = () => {
    navigate("/community");
  };

  return (
    <div className={styles.navbar}>
      {/* 헤더 메뉴 */}
      <header className={`${styles.header_set} ${styles.align_center}`}>
        <div className={styles.align_center}>
          <div className={`${styles.logo_img} ${styles.Title}`}></div>
          <div className={styles.nickname}>{userNickname} 님</div>
        </div>
        <div className={`${styles.align_center} ${styles.Tag_list} `}>
          <div
            className={`${styles.align_center} ${styles.Tag} `}
            onClick={handleHomeClick}
          >
            홈
          </div>
          <div
            className={`${styles.align_center} ${styles.Tag} `}
            onClick={handlePlannerClick}
          >
            플래너
          </div>
          <div
            className={`${styles.align_center} ${styles.Tag} `}
            onClick={handleExpensesClick}
          >
            경비계산 / 준비물
          </div>
          {/* <div
            className={`${styles.align_center} ${styles.Tag} `}
            onClick={handleTourismClick}
          >
            관광지
          </div> */}
          <div
            className={`${styles.align_center} ${styles.Tag} `}
            onClick={handleCommunityClick}
          >
            커뮤니티
          </div>
          <div
            className={`${styles.align_center} ${styles.Tag} `}
            onClick={handleLogout}
          >
            로그아웃
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
