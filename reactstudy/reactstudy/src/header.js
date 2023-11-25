import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import store from './redux/store';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 확인 알람 창
    const shouldLogout = window.confirm("로그아웃 하시겠습니까?");

    store.dispatch({
      type: 'SET_USER_INFO',
      payload: {
        signup_name: null,
        signup_birth: null,
        signup_gender: null,
        signup_id: null,
        signup_nickname: null,
      },
    });


    if (shouldLogout) {
      // 로그아웃 로직
      navigate("/"); // 로그아웃 후 로그인 페이지로 이동
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

  const handleTourismClick = () => {
    //navigate("/tourism");
  };

  const handleCommunityClick = () => {
    navigate("/community");
  };

  return (
    <div className={styles.navbar}>
      {/* 헤더 메뉴 */}
      <header className={`${styles['header-set']} ${styles['align-center']}`}>
        <div className={`${styles['align-center']}`}>
          <div className={`${styles.logo_img} ${styles.Title}`}></div>
        </div>
        <div className={`${styles['align-center']} ${styles['Tag-list']}`}>
          <div className={`${styles.Tag}`} onClick={handleHomeClick}>
            홈
          </div>
          <div className={`${styles.Tag}`} onClick={handlePlannerClick}>
            플래너
          </div>
          <div className={`${styles.Tag}`} onClick={handleExpensesClick}>
            경비계산 / 준비물
          </div>
          <div className={`${styles.Tag}`} onClick={handleTourismClick}>
            관광지
          </div>
          <div className={`${styles.Tag}`} onClick={handleCommunityClick}>
            커뮤니티
          </div>
          <div className={`${styles.Tag}`} onClick={handleLogout}>
            로그아웃
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
