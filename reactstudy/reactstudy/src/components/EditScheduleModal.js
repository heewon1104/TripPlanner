import React, { useState, useEffect } from 'react';

function EditScheduleModal({ isOpen, closeModal, editedSchedule }) {
  const [scheduleData, setScheduleData] = useState(editedSchedule); // 수정할 스케줄 정보를 상태로 관리

  // 수정된 스케줄 정보를 저장하는 함수
  const handleSave = () => {
    // 여기에서 API 호출 또는 DB 업데이트를 수행하고,
    // 업데이트가 성공하면 아래 두 줄의 코드를 실행합니다.
    closeModal();
  };

  useEffect(() => {
    // editedSchedule이 변경될 때마다 scheduleData를 업데이트
    setScheduleData(editedSchedule);
  }, [editedSchedule]);

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>스케줄 수정</h2>
        <form>
          {/* 수정할 스케줄 정보 입력 필드 */}
          <label htmlFor="startday">시작 날짜:</label>
          <input
            type="text"
            id="startday"
            name="startday"
            value={scheduleData.startday}
            onChange={(e) =>
              setScheduleData({ ...scheduleData, startday: e.target.value })
            }
          />

          {/* 나머지 스케줄 정보 입력 필드들 추가 */}
          
          <button type="button" onClick={handleSave}>
            저장
          </button>
          <button type="button" onClick={closeModal}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditScheduleModal;