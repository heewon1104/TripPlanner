import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직
    navigate("/"); // "/"(로그인) 페이지로 이동
  };

  const handleHomeClick = () => {
    navigate("/main"); // "/main" 페이지로 이동
  };

  const handlePlannerClick = () => {
    navigate("/planner"); // "/planner" 페이지로 이동
  };

  const handleExpensesClick = () => {
    navigate("/expenses"); // "/expenses" 페이지로 이동
  };

  const handleTourismClick = () => {
    navigate("/tourism"); // "/tourism" 페이지로 이동
  };

  const handleCommunityClick = () => {
    navigate("/community"); // "/community" 페이지로 이동
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
