import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import styles from './PlannerWeather.module.css';

import coldWinterImg from '../assets/cold_winter.jpg';
import winterImg from '../assets/winter.jpg';
import springImg from '../assets/spring.jpg';
import summerImg from '../assets/summer.jpg';

const clothingData = [
  { temperatureRange: '-10°C ~ 0°C', clothes: { outerwear: '겨울 외투: 패딩, 다운 재킷, 울 코트 등', top: '두꺼운 니트웨어 또는 기모 내의', bottom: '기모 하의', accessory: '목도리, 장갑, 비니 등의 액세서리', footwear: '두꺼운 부츠 또는 방수 부츠' } },
  { temperatureRange: '0°C ~ 10°C', clothes: { outerwear: '겨울 코트 또는 두꺼운 점퍼', top: '니트 풀오버 또는 스웨터', bottom: '청바지, 슬랙스 등 따뜻한 팬츠', accessory: '목도리나 비니와 같은 액세서리' } },
  { temperatureRange: '10°C ~ 20°C', clothes: { outerwear: '가벼운 자켓, 블레이저 또는 카디건', top: '긴팔 티셔츠, 블라우스, 얇은 니트 등', bottom: '슬랙스, 치노 팬츠, 스커트 등', accessory: '가벼운 스카프 또는 액세서리' } },
  { temperatureRange: '20°C ~ 30°C', clothes: { outerwear: '없음', top: '반팔 티셔츠, 얇은 셔츠, 블라우스', bottom: '반바지, 면바지, 스커트', accessory: '모자, 선글라스, 얇은 스카프' } },
];

const PlannerWeather = ({ isOpen, closeModal }) => {
  const [temperature, setTemperature] = useState(20);
  const [recommendedImg, setRecommendedImg] = useState(springImg); // 기본 이미지 설정

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    // 이미지 로드를 비동기로 처리
    const loadImages = async () => {
      setRecommendedImg(await getRecommendedImg());
    };

    loadImages();
  }, [temperature]);

  const handleTemperatureChange = (event) => {
    const newTemperature = parseInt(event.target.value);
    setTemperature(newTemperature);
  };

  const getRecommendedImg = async () => {
    if (temperature <= 0) {
      return coldWinterImg;
    } else if (temperature <= 10) {
      return winterImg;
    } else if (temperature <= 20) {
      return springImg;
    } else if(temperature > 20){
      return summerImg;
    } else{
      return summerImg;
    }
  };
  

  const getRecommendedClothes = () => {
    if (temperature <= 0) {
      return clothingData[0].clothes;
    } else if (temperature <= 10) {
      return clothingData[1].clothes;
    } else if (temperature <= 20) {
      return clothingData[2].clothes;
    } else {
      return clothingData[3].clothes;
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={closeModal}
      centered
      style={{ zIndex: 2000 }} // Adjust this value as needed
    >
      <Modal.Header closeButton>
        <Modal.Title>기온별 옷차림 추천</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <input
          type="number"
          value={temperature}
          onChange={handleTemperatureChange}
          placeholder="현재 온도 (°C)"
        />
        <div className="recommended-clothes">
          <img className={styles.recommended_img} src={recommendedImg} alt="Recommended Outfit"/>
          <h5>추천 옷차림:</h5>
          <p><strong>상의:</strong> {getRecommendedClothes().top}</p>
          <p><strong>하의:</strong> {getRecommendedClothes().bottom}</p>
          <p><strong>아우터:</strong> {getRecommendedClothes().outerwear}</p>
          {getRecommendedClothes().footwear && <p><strong>신발:</strong> {getRecommendedClothes().footwear}</p>}
          {getRecommendedClothes().accessory && <p><strong>액세서리:</strong> {getRecommendedClothes().accessory}</p>}
        </div>
        <a
          href="https://www.weather.go.kr/w/theme/world-weather.do"
          target="_blank"
          rel="noopener noreferrer"
          className="weather-link"
        >
          기상청에서 날씨정보 확인하기
        </a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlannerWeather;
