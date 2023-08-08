import "./main.css";
import Gridlayout from "./gridlayout";
import logo2_img from "./assets/logo2.PNG";

const MainPage = () => {
  return (
    <div class="mainbox">
      <header className="header-set align-center">
        <img class="img_logo2" src={logo2_img} alt="img"></img>
        <div className="align-center Tag-list">
          <div class="Tagbox">
            <div className="align-center Tag">홈</div>
          </div>
          <div class="Tagbox">
            <div className="align-center Tag">플래너</div>
          </div>
          <div class="Tagbox">
            <div className="align-center Tag">경비계산 / 준비물</div>
          </div>
          <div class="Tagbox">
            <div className="align-center Tag">관광지</div>
          </div>
          <div class="Tagbox">
            <div className="align-center Tag">커뮤니티</div>
          </div>
          <div class="Tagbox">
            <div className="align-center Tag">오류문의</div>
          </div>
        </div>
      </header>
      <div class="girdbox">
        <div class="grid">
          <Gridlayout></Gridlayout>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
