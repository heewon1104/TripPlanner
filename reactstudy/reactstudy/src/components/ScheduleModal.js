import React, { useEffect } from 'react';
import './ScheduleModal.css';

function ScheduleModal({ isOpen, closeModal, scheduleData }) {
  useEffect(() => {
    console.log(scheduleData)
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const googleMapsUrl = `https://www.google.co.kr/maps/dir/${encodeURIComponent(scheduleData.start)}`;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{scheduleData.start}</h2>
        <p>일정 시작시간: {scheduleData.start_time}</p>
        <p>일정 종료시간: {scheduleData.end_time}</p>
        <button onClick={closeModal}>닫기</button>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          구글맵으로 길찾기
        </a>
      </div>
    </div>
  );
}

export default ScheduleModal;
