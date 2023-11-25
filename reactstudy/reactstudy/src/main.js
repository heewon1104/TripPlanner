import styles from "./main.module.css";
// import Grid from "./gridlayout"; //gridlayout 컴포넌트 불러오기
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트를 import
import PlaceImageBox from "./PlaceImageBox"; // PlaceImageBox 컴포넌트 불러오기
import Header from "./header";
import recommendations from "./recommendations"; // 추천 여행지 데이터 참조

import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "./redux/actions";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [dDay, setDDay] = useState("");
  const [targetDate, setTargetDate] = useState(""); // 목표 날짜를 보여줄 상태 변수
  const [targetLocation, setTargetLocation] = useState(""); // 목표 장소를 보여줄 상태 변수
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    const result = getUserInfo();
    console.log("Main : " , result);

    if(result.signup_id == null){
      alert("로그인 후 이용가능합니다");
      navigate("/");
    }
  }, [userInfo]); 


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
    <div className={styles.mainbox}>
      {/* header */}
      <Header />

      {/* body */}
      <div className={styles.content_body}>
        <div className={styles.content1}>
          {/* 이미지 영역 */}
          <div className={styles.img_body}></div>

          {/* 디데이 */}
          <Link
            to={`/planner?place=${targetLocation}`}
            className={`${styles.d_day_box} ${styles['align-center']}`}
          >
            <div className={styles.d_day_txt}>My Trip</div>
            <div className={styles.d_day}>{dDay}</div>
            <div className={`${styles.d_day_date} ${styles.d_day_txt}`}>
              Date. {targetDate}
            </div>
            <div className={`${styles.d_day_des} ${styles.d_day_txt}`}>
              To. {targetLocation}
            </div>
          </Link>
        </div>

        <div className={styles.content2}>
          <div className={styles.content2_}>
            <div className={styles.place_age}>20대 추천 여행지 Top5</div>
            <div className={styles['place-image-boxes']}>
              {recommendations.twenties.map((place, index) => (
                <PlaceImageBox
                  key={index}
                  imageUrl={place.imageUrl}
                  placeName={place.placeName}
                />
              ))}
            </div>
          </div>

          <div className={styles.content2_}>
            <div className={styles.place_gender}>여성 추천 여행지 Top5</div>
            <div className={styles['place-image-boxes']}>
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

        {/* 그리드 박스: 플래너 목록 */}
        {/* 
        <div className={styles.grid_body}>
          <div className={styles.grid_txt}>My Trip</div>
          <div className={styles.grid}>
            <Grid />
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default MainPage;
