import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 확인 알람 창
    const shouldLogout = window.confirm("로그아웃 하시겠습니까?");

    if (shouldLogout) {
      // 로그아웃 로직
      navigate("/"); // 로그아웃 후 로그인 페이지로 이동
    }
  };

  const handleHomeClick = () => {
    navigate("/main");
  };

  const handlePlannerClick = () => {
    navigate("/planner");
  };

  const handleExpensesClick = () => {
    navigate("/expenses");
  };

  const handleTourismClick = () => {
    navigate("/tourism");
  };

  const handleCommunityClick = () => {
    navigate("/community");
  };

  return (
    <div className="navbar">
      {/* 헤더 메뉴 */}
      <header className="header-set align-center">
        <div className="align-center ">
          <div className="logo_img Title"></div>
        </div>
        <div className="align-center Tag-list">
          <div className="align-center Tag" onClick={handleHomeClick}>
            홈
          </div>
          <div className="align-center Tag" onClick={handlePlannerClick}>
            플래너
          </div>
          <div className="align-center Tag" onClick={handleExpensesClick}>
            경비계산 / 준비물
          </div>
          <div className="align-center Tag" onClick={handleTourismClick}>
            관광지
          </div>
          <div className="align-center Tag" onClick={handleCommunityClick}>
            커뮤니티
          </div>
          <div className="align-center Tag" onClick={handleLogout}>
            로그아웃
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
