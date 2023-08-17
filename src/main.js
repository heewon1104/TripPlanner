import "./main.css";
import Grid from "./gridlayout"; //gridlayout 컴포넌트 불러오기
import logo2_img from "./assets/logo2.PNG";

const MainPage = () => {
  return (
    <div className="mainbox ">
      {/* 헤더 메뉴 */}
      <header className="header-set align-center">
        <img className="img_logo2" src={logo2_img} alt="img"></img>
        <div className="align-center Tag-list">
          <div className="Tagbox">
            <div className="align-center Tag">홈</div>
          </div>
          <div className="Tagbox">
            <div className="align-center Tag">플래너</div>
          </div>
          <div className="Tagbox">
            <div className="align-center Tag">경비계산 / 준비물</div>
          </div>
          <div className="Tagbox">
            <div className="align-center Tag">관광지</div>
          </div>
          <div className="Tagbox">
            <div className="align-center Tag">커뮤니티</div>
          </div>
          <div className="Tagbox">
            <div className="align-center Tag">오류문의</div>
          </div>
        </div>
      </header>
      {/* body */}
      <div className="content_body align-center">
        {/* 이미지 영역 */}
        <div className="img_body align-center">image</div>
        {/* 그리드 박스 : 플래너 목록 */}
        <div className="grid_body">
          <div className="grid_txt">My Trip</div>
          <div className="grid">
            <Grid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
