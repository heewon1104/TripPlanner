import React, { useState, useEffect } from 'react';
import ScheduleItem from './ScheduleItem';
import './SchedulePage.css'
import PlannerWeather from './PlannerWeather'
import { useNavigate } from "react-router-dom";
import ScheduleModal from "./ScheduleModal"
import axios from 'axios';
import Header from "../header";

import { getUserInfo } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";


function SchedulePage() {
    const userInfo = useSelector((state) => state.user);
    const getUser = getUserInfo();

    const navigate = useNavigate();

    useEffect(() => {
        const result = getUserInfo();
        console.log("Main : " , result);

        if(result.signup_id == null){
        alert("로그인 후 이용가능합니다");
        navigate("/");
        }
    }, [userInfo]); 

    useEffect(() => {
        const result = getUserInfo();
        console.log("Main : " , result);
      }, [userInfo]); 

    // 시간표 추가 모달창에 관한 변수
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 시간표 추가 모달창 열기, 닫기
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 날씨확인 모달창
    const [WeatherModalOpen, setWeatherModalOpen] = useState(false);

     // 날씨확인 모달창 열기, 닫기
    const openweatherModal = () => setWeatherModalOpen(true);
    const closweatherModal = () => setWeatherModalOpen(false);

    const goToC = () => {
        navigate("/expense");
    }

    // time 객체를 int로 변환해 분으로 계산하는 함수 
    function timeToMinutes(time) {
        if (!time) {
            return 0; // or some default value based on your use case
        }
    
        const [hours, minutes] = time.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;
        return totalMinutes;
    }

    // 추가된 시간표 클릭시 뜨는 모달창
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const openScheduleModal = (schedule) => {
      setSelectedSchedule(schedule);
    };
  
    const closeScheduleModal = () => {
      setSelectedSchedule(null);
    };

    // 시작시간, 종료시간 차이 계산 함수
    function subtractTimes(time1, time2) {
        const time1InMinutes = timeToMinutes(time1);
        const time2InMinutes = timeToMinutes(time2);
        return time1InMinutes - time2InMinutes;
    }

    //요일 계산하고 반환하는 함수, 1은 일요일
    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = [1, 2, 3, 4, 5, 6, 7];
        const dayOfWeek = date.getDay();
        return days[dayOfWeek];
      };

    // 추가한 시간표를 배열로 저장
    const [data, setData] = useState([]);

    // 시간표에 관한 추가정보 배열에 저장
    const addData = (newData) => {
        // 시간표 인덱스
        newData.index = data.length + 1;
        // 시간표 요일
        newData.day = getDayOfWeek(newData.startday); 
        // 시작시간, 종료시간 차이
        newData.subtime = subtractTimes(newData.endtime, newData.starttime);
        // 시간표 margin 위치
        newData.topmargin = timeToMinutes(newData.starttime);

        setData((prevData) => [...prevData, newData]);
      };

      useEffect(() => {
        console.log(data); // data 배열의 최신 값을 출력
      }, [data]); 

    // 배열이 비어있는 상태
    const isDataEmpty = data.length === 0;

    
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const initialStartDate = new Date("2023-11-14");
    const initialEndDate = new Date("2023-12-20");
    const locationName = "도쿄";
    const user_id = getUser.signup_id;

    const addStartDate = (newData) => {
        setStartDate((prevData) => [...prevData, newData.startday]);
        setEndDate((prevData) => [...prevData, newData.endday]);
    };
    
    useEffect(() => {
        const newData = {
        startday: initialStartDate,
        endday: initialEndDate,
        };
        addStartDate(newData);

        // 0: 일요일, 1: 월요일, ... , 6: 토요일
        newData.StartDayofweek = new Date(newData.startday).getDay();
        newData.EndDayofweek = new Date(newData.endday).getDay();

        console.log(newData);
    }, []);

    // startdate와 enddate 사이의 날짜들을 주 단위로 가져오는 함수를 만듭니다.
    // 주 단위로 날짜를 가져오는 함수를 만듭니다.
    function getDates(startDate, endDate) {
        const dates = [];
        let currentDate = new Date(startDate);
        endDate = new Date(endDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 6);
        }
        return dates;
    }

    // 주 단위로 날짜를 가져와서 해당 주에 해당하는 데이터를 출력하는 함수
    function renderDayByIndex(index) {
        const weekDates = getDates(new Date(currentWeekStartDate), new Date(currentWeekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000));
        const sun = weekDates[0]?.toLocaleDateString('ko-KR');
        const sat = weekDates[weekDates.length - 1]?.toLocaleDateString('ko-KR');
      
      
        const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
      
        const date = new Date(weekDates[0]); // 첫 번째 날짜를 가져와서 새로운 Date 객체를 생성합니다.
        date.setDate(date.getDate() + index); // 인덱스를 이용하여 주의 시작 날짜로부터 index만큼의 날짜를 더합니다.
        const formattedDate = date?.toLocaleDateString('ko-KR');
        const dayOfWeek = weekDays[date?.getDay() || 0];
      
        return `${dayOfWeek} ${formattedDate}`;
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      
    function renderDayByIndexKey(index) {
        const weekDates = getDates(new Date(currentWeekStartDate), new Date(currentWeekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000));
        const sun = weekDates[0];
        const sat = weekDates[weekDates.length - 1];
        
        const date = new Date(weekDates[0]); // 첫 번째 날짜를 가져와서 새로운 Date 객체를 생성합니다.
        date.setDate(date.getDate() + index); // 인덱스를 이용하여 주의 시작 날짜로부터 index만큼의 날짜를 더합니다.
        
        const formattedDate = formatDate(date);
    
        return formattedDate;
    }
    
    const findsunday = initialStartDate; // 오늘 날짜
    if(findsunday.getDay() != 0){
        findsunday.setDate(findsunday.getDate() - findsunday.getDay()); // 오늘 날짜에서 1주일(7일)을 빼줍니다.
    }
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(findsunday);

    // 이전주 버튼 클릭 시 이벤트 핸들러
    const goToPreviousWeek = () => {
        const previousWeekStartDate = new Date(currentWeekStartDate);
        previousWeekStartDate.setDate(previousWeekStartDate.getDate() - 7);
        setCurrentWeekStartDate(previousWeekStartDate);
    };

    // 다음주 버튼 클릭 시 이벤트 핸들러
    const goToNextWeek = () => {
        const nextWeekStartDate = new Date(currentWeekStartDate);
        nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
        setCurrentWeekStartDate(nextWeekStartDate);
    };
    
    const serverHost = 'http://localhost'; // 클라이언트와 서버가 같은 컴퓨터에서 실행되는 경우
    const serverPort = 80; 

     useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverHost}:${serverPort}/api/planner`, {
                    params: {
                        user_id: getUser.signup_id // user_id를 서버로 전달
                    }
                });
                const fetchedData = response.data; // API 응답 데이터
        
                // fetchedData 배열의 각 요소에 새로운 변수를 추가
                const modifiedData = fetchedData.map((item, index) => {
                    // 시간표 인덱스
                    item.index = index + 1;
                    // 시간표 요일
                    item.day = getDayOfWeek(item.startday);
                    // 시작시간, 종료시간 차이
                    item.subtime = subtractTimes(item.end_time, item.start_time);
                    // 시간표 margin 위치
                    item.topmargin = timeToMinutes(item.start_time);
        
                    return item;
                });
        
                // 데이터 업데이트
                setData(modifiedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // 페이지 로드 시 데이터를 가져옴
    }, [getUser.signup_id]);

    function filterScheduleByWeek(scheduleData, currentWeekStartDate) {
        const endDate = new Date(currentWeekStartDate);
        endDate.setDate(endDate.getDate() + 6); // 현재 주의 끝 날짜 계산

        return scheduleData.filter((item) => {
            const scheduleDate = new Date(item.startday);
            return scheduleDate >= currentWeekStartDate && scheduleDate <= endDate;
        });
    }

    const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState(null);

    const handleEditSchedule = (schedule) => {
        console.log(schedule)
        setEditedSchedule(schedule); // 선택한 스케줄 정보를 상태에 저장
        openModal(); // 모달 창 열기
    };
    
    function formatDateToYYYYMMDD(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      
    // 스케줄 삭제 함수
    const handleDeleteSchedule = (schedule) => {
        console.log(schedule)
        // 스케줄 삭제를 위한 로직 작성

        const deleteschedule = {
            user_id: getUser.signup_id,
            startday: formatDateToYYYYMMDD(schedule.startday),
            start_time: schedule.start_time
        };

        try {
            fetch(`${serverHost}:${serverPort}/api/schedule`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deleteschedule),
                
            })

            const updatedData = data.filter((item) => {
                return (
                  item.user_id !== schedule.user_id ||
                  item.startday !== schedule.startday ||
                  item.start_time !== schedule.start_time
                );
              });
          
              // 업데이트된 배열을 데이터로 설정
              setData(updatedData);

        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    const [scheduleData, setScheduleData] = useState([]);
      
    const addNewSchedule = (newSchedule) => {
        // 새로운 일정을 data 배열에 추가합니다.
        setData([...data, newSchedule]);
      };

    

      return (<div className= 'SAll align-center'>
      <ScheduleItem isOpen={isModalOpen} closeModal={closeModal} onSave={setData} editedSchedule={editedSchedule} addNewSchedule={addNewSchedule}
      scheduleData={data}  />
      <PlannerWeather isOpen={WeatherModalOpen} closeModal={closweatherModal} />
      <ScheduleModal isOpen={selectedSchedule !== null} closeModal={closeScheduleModal} scheduleData={selectedSchedule}/>
      <Header></Header>

      <div id="schedlue-set" className='schdule-set align-center'>
          <div className='title-list align-center'>
              <div className="schdule-title">시간표 1</div>
              <button className='weather-button' onClick={openweatherModal}> 해당도시 날씨 확인하기</button>
          </div>
          <div className="week-button-list align-center">
              <button className="week-button-prev" onClick={goToPreviousWeek}>이전주</button>
              <button className="week-button-next" onClick={goToNextWeek}>다음주</button>
          </div>
          <div className="week-button-list align-center">
              <button className="add-schedule-item" onClick={openModal}>시간표 추가</button>
          </div>
              <div className='schdule align-center'>
                  <div className='schdule-item align-center'>
                      <div className='week-top align-center border-right'>시간/요일</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>00시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>01시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>02시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>03시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>04시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>05시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>06시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>07시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>08시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>09시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>10시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>11시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>12시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>13시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>14시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>15시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>16시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>17시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>18시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>19시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>20시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>21시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>22시</div>
                      <div className='schdule-item align-center border-right schdule-content-list'>23시</div>
                  </div>
                  {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                      <div key={dayIndex} className={`schdule-item align-center border-right-gray`}>
                          <div className="week-top align-center">{renderDayByIndex(dayIndex)}</div>
                          {filterScheduleByWeek(data, currentWeekStartDate).map((item) => {
                              if (item.day === dayIndex + 1) {
                                  return (
                                      <div
                                          key={item.index}
                                          className={`schdule-content-add ${isDataEmpty ? 'hidden' : ''}`}
                                          style={{
                                              top: isDataEmpty ? '0%' : `${44 + item.topmargin * 0.8}px`,
                                              display: isDataEmpty ? 'none' : 'block',
                                              height: isDataEmpty ? '0px' : `${item.subtime * 0.8}px`,
                                          }}
                                          onClick={() => openScheduleModal(item)}
                                      >
                                          <p>위치: {item.start}</p>
                                          <div className="schedule-actions">
                                              <button onClick={(e) => {
                                                  e.stopPropagation(); // 이벤트 전파 막음
                                                  handleEditSchedule(item);
                                              }}>수정</button>
                                              <button onClick={(e) => {
                                                  e.stopPropagation(); // 이벤트 전파 막음
                                                  handleDeleteSchedule(item);
                                              }}>삭제</button>
                                          </div>
                                      </div>
                                  );
                              }
                              return null;
                          })}
                      </div>
                  ))}
              </div>
          </div>

          <footer className='footer-set align-center'>
              <div>create by OYR 1조</div>
              <div>email: OpenYearRound@naver.com</div>
          </footer>
  </div>)
}

export default SchedulePage;