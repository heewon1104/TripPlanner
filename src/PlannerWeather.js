import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const clothingData = [
  { temperatureRange: '-10°C ~ 0°C', clothes: '겨울 외투: 패딩, 다운 재킷, 울 코트 등\n두꺼운 니트웨어 또는 기모 내의\n목도리, 장갑, 비니 등의 액세서리\n두꺼운 부츠 또는 방수 부츠' },
  { temperatureRange: '0°C ~ 10°C', clothes: '겨울 코트 또는 두꺼운 점퍼\n니트 풀오버 또는 스웨터\n청바지, 슬랙스 등 따뜻한 팬츠\n목도리나 비니와 같은 액세서리' },
  { temperatureRange: '10°C ~ 20°C', clothes: '가벼운 자켓, 블레이저 또는 카디건\n긴팔 티셔츠, 블라우스, 얇은 니트 등\n슬랙스, 치노 팬츠, 스커트 등\n가벼운 스카프 또는 액세서리' },
  { temperatureRange: '20°C ~ 30°C', clothes: '반팔 티셔츠, 블라우스, 탱크탑 등\n반바지, 스커트, 가벼운 팬츠 등\n모자, 선글라스, 선크림 등의 햇빛 차단용품' },
  { temperatureRange: '30°C ~ 40°C', clothes: '가볍고 통기성 있는 반팔 티셔츠, 원피스 등\n반바지, 린넨 바지 등\n모자와 선글라스, 선크림 등의 햇빛 차단용품' },
];
const PlannerWeather = ({ isOpen, closeModal }) => {
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
  
    const [temperature, setTemperature] = useState(20);
  
    const handleTemperatureChange = (event) => {
      const newTemperature = parseInt(event.target.value);
      setTemperature(newTemperature);
    };
  
    const getRecommendedClothes = () => {
        if (temperature <= 0) {
            return clothingData[0].clothes;
          } else if (temperature <= 10) {
            return clothingData[1].clothes;
          } else if (temperature <= 20) {
            return clothingData[2].clothes;
          } else if (temperature <= 30) {
            return clothingData[3].clothes;
          } else {
            return clothingData[4].clothes;
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
          <Modal.Title>오늘의 옷차림 추천</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="number"
            value={temperature}
            onChange={handleTemperatureChange}
            placeholder="현재 온도 (°C)"
          />
          <div className="recommended-clothes">
            {getRecommendedClothes()}
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