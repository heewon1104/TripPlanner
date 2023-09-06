import "./main.css";
// import Grid from "./gridlayout"; //gridlayout 컴포넌트 불러오기
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트를 import
import PlaceImageBox from "./PlaceImageBox"; // PlaceImageBox 컴포넌트 불러오기
import Header from "./header";
import recommendations from "./recommendations"; // 추천 여행지 데이터 참조

const MainPage = () => {
  const [dDay, setDDay] = useState("");
  const [targetDate, setTargetDate] = useState(""); // 목표 날짜를 보여줄 상태 변수
  const [targetLocation, setTargetLocation] = useState(""); // 목표 장소를 보여줄 상태 변수

  useEffect(() => {
    // D-day 계산을 위한 날짜 설정
    const targetDate = new Date("2023-09-01"); // 원하는 D-day 날짜 설정
    const today = new Date();
    const timeDiff = targetDate - today;
    const targetLocation = "Tokyo";

    // 날짜 차이 계산
    const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    setTargetDate(targetDate.toLocaleDateString()); // 목표 날짜를 형식에 맞게 저장
    setTargetLocation(targetLocation); // 원하는 목표 장소 정보 설정

    if (daysRemaining > 0) {
      setDDay(`D-${daysRemaining}`);
    } else if (daysRemaining === 0) {
      setDDay("D-day");
    } else {
      setDDay(`D+${Math.abs(daysRemaining)}`);
    }
  }, []);

  return (
    <div className="mainbox ">
      {/*header*/}
      <Header></Header>
      {/* body */}
      <div className="content_body">
        <div className="content1">
          {/* 이미지 영역 */}
          <div className="img_body "></div>
          {/* 디데이 */}
          <Link
            to={`/planner?place=${targetLocation}`}
            className="d_day_box align-center"
          >
            <div className="d_day_txt">My Trip</div>
            <div className="d_day">{dDay}</div>
            <div className="d_day_date d_day_txt">Date. {targetDate}</div>
            <div className="d_day_des d_day_txt">To. {targetLocation}</div>
          </Link>
        </div>

        <div className="content2">
          <div className="content2_">
            <div className="place_age content2_txt">20대 추천 여행지 Top5</div>
            <div className="place-image-boxes">
              {recommendations.twenties.map((place, index) => (
                <PlaceImageBox
                  key={index}
                  imageUrl={place.imageUrl}
                  placeName={place.placeName}
                />
              ))}
            </div>
          </div>
          <div className="content2_">
            <div className="place_gender content2_txt">
              여성 추천 여행지 Top5
            </div>
            <div className="place-image-boxes">
              {recommendations.womens.map((place, index) => (
                <PlaceImageBox
                  key={index}
                  imageUrl={place.imageUrl}
                  placeName={place.placeName}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 그리드 박스 : 플래너 목록
        <div className="grid_body">
          <div className="grid_txt">My Trip</div>
          <div className="grid">
            <Grid />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MainPage;
