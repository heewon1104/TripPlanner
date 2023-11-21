import styles from "./main.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlaceImageBox from "./PlaceImageBox";
import Header from "./header";
import recommendations from "./recommendations";

// 사용자의 생년월일에서 출생년도를 추출하여 현재 나이를 계산하는 함수
function calculateAgeFromBirthdate(birthdate) {
  const today = new Date(); // 현재 날짜를 가져옴

  // 사용자의 생년월일을 배열로 분리
  const birthdateArray = birthdate.split(".");
  const birthYear = parseInt(birthdateArray[0], 10); // 년도를 정수로 변환

  // 사용자의 출생년도로 현재 나이 계산
  const age = today.getFullYear() - birthYear;

  // 나이를 10의 자리로 반올림하여 반환
  return Math.floor(age / 10) * 10;
}

// 사용자 정보 요청 fetch
const fetchUserDataFromDB = async (userId) => {
  try {
    const response = await fetch(`/api/userinfo/${userId}`);
    const userData = await response.json();

    return userData;
  } catch (error) {
    console.error("오류가 발생했습니다. ", error);
    throw error;
  }
};

const MainPage = () => {
  // 여행날짜
  const [dDay, setDDay] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetLocation, setTargetLocation] = useState("");

  // 사용자 정보 DB에서 받아오기(성별, 연령대)
  const [userGender, setUserGender] = useState("women");
  const [userAge, setUserAge] = useState(20);

  // 사용자의 성별에 따라 동적으로 추천 여행지 설정
  const userRecommendationsGender =
    userGender === "women" ? recommendations.women : recommendations.men;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // DB에서 여행 계획 가져오기 (D-day 계산을 위한 날짜 설정)
        const targetDate = new Date("2023-09-01");
        const today = new Date();
        const timeDiff = targetDate - today;
        const targetLocation = "Tokyo";

        // 날짜 차이 계산
        const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        setTargetDate(targetDate.toLocaleDateString());
        setTargetLocation(targetLocation);

        if (daysRemaining > 0) {
          setDDay(`D-${daysRemaining}`);
        } else if (daysRemaining === 0) {
          setDDay("D-day");
        } else {
          setDDay(`D+${Math.abs(daysRemaining)}`);
        }
      } catch (error) {
        console.error("데이터를 불러오는 동안 오류가 발생했습니다.", error);
      }
    };

    fetchData();
  }, []);

  // 사용자의 연령대에 따라 동적으로 추천 여행지 설정
  const userRecommendationsAge =
    userAge === 20
      ? recommendations.twenties
      : userAge === 30
      ? recommendations.thirties
      : recommendations.forties;

  return (
    <div className={styles.mainbox}>
      {/* header */}
      <Header></Header>
      {/* body */}
      <div className={styles.content_body}>
        <div className={styles.content1}>
          {/* 이미지 영역 */}
          <div className={styles.img_body}></div>
          {/* 디데이 */}
          <Link
            to={`/planner?place=${targetLocation}`}
            className={`${styles.d_day_box} ${styles.align_center}`}
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
            <div className={`${styles.place_gender} ${styles.content2_txt}`}>
              {userGender === "women" ? "여성" : "남성"} 추천 여행지 Top5
            </div>
            <div className={styles.place_image_boxes}>
              {userRecommendationsGender &&
              userRecommendationsGender.length > 0 ? (
                userRecommendationsGender.map((place, index) => (
                  <PlaceImageBox
                    key={index}
                    imageUrl={place.imageUrl}
                    placeName={place.placeName}
                  />
                ))
              ) : (
                <p>추천 여행지를 준비중입니다.</p>
              )}
            </div>
          </div>
          <div className={styles.content2_}>
            <div className={`${styles.place_age} ${styles.content2_txt}`}>
              {userAge}대 추천 여행지 Top5
            </div>
            <div className={styles.place_image_boxes}>
              {userRecommendationsAge && userRecommendationsAge.length > 0 ? (
                userRecommendationsAge.map((place, index) => (
                  <PlaceImageBox
                    key={index}
                    imageUrl={place.imageUrl}
                    placeName={place.placeName}
                  />
                ))
              ) : (
                <p>추천 여행지를 준비중입니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
