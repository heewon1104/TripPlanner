import React, { useState, useEffect } from 'react';
import ScheduleItem from './ScheduleItem';
import './SchedulePage.css'
import PlannerWeather from './PlannerWeather'
import Transport from './Transport'
import { useNavigate } from "react-router-dom";
import ExpenseCalculationAndSupplies from "./ExpenseCalculationAndSupplies";
import ScheduleModal from "./ScheduleModal"

function SchedulePage() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [WeatherModalOpen, setWeatherModalOpen] = useState(false);

    const openweatherModal = () => setWeatherModalOpen(true);
    const closweatherModal = () => setWeatherModalOpen(false);

    const navigate = useNavigate();

    const goToC = () => {
        navigate("/cal");
    }

    //모달창 데이터 저장
    function timeToMinutes(time) {
        if (!time) {
            return 0; // or some default value based on your use case
        }
    
        const [hours, minutes] = time.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;
        return totalMinutes;
    }

    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const openScheduleModal = (schedule) => {
      setSelectedSchedule(schedule);
    };
  
    const closeScheduleModal = () => {
      setSelectedSchedule(null);
    };

    function subtractTimes(time1, time2) {
        const time1InMinutes = timeToMinutes(time1);
        const time2InMinutes = timeToMinutes(time2);
        console.log(time1InMinutes);
        console.log(time2InMinutes);
        console.log(time1InMinutes - time2InMinutes);
        return time1InMinutes - time2InMinutes;
    }

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = [1, 2, 3, 4, 5, 6, 7];
        const dayOfWeek = date.getDay();
        return days[dayOfWeek];
      };

    const [data, setData] = useState([]);

    const addData = (newData) => {
        newData.index = data.length + 1;
        newData.day = getDayOfWeek(newData.startday); 
        newData.subtime = subtractTimes(newData.endtime, newData.starttime);
        newData.topmargin = timeToMinutes(newData.starttime);

        setData((prevData) => [...prevData, newData]);
      };

      useEffect(() => {
        console.log(data); // data 배열의 최신 값을 출력
      }, [data]); 

    const isDataEmpty = data.length === 0;

    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const initialStartDate = new Date("2023-08-18");
    const initialEndDate = new Date("2023-09-08");
    const locationName = "도쿄"

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
        
        console.log(formattedDate);
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
    
    return (<div className='SAll align-center'>
        <ScheduleItem isOpen={isModalOpen} closeModal={closeModal} onSave={addData}/>
        <PlannerWeather isOpen={WeatherModalOpen} closeModal={closweatherModal} />
        <ScheduleModal isOpen={selectedSchedule !== null} closeModal={closeScheduleModal} scheduleData={selectedSchedule}/>
        <header className='Sheader-set align-center'>
            <div className='align-center Title'> </div>
            <div className='align-center Tag-list'>
                <div className='align-center Tag'>홈</div>
                <div className='align-center Tag'>플래너</div>
                <div className='align-center Tag' onClick={goToC}>경비계산 / 준비물</div>
                <div className='align-center Tag'>관광지</div>
                <div className='align-center Tag'>커뮤니티</div>
                <div className='align-center Tag'>오류문의</div>
            </div>
        </header>

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

                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>{renderDayByIndex(0)}</div>

                        {data.map((item) => {
                            if (item.day === 1 && renderDayByIndexKey(0) === item.startday) {
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
                                    </div>
                                    );
                            }
                                return null;
                            })}
                    </div>

                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>{renderDayByIndex(1)}</div>
                        {data.map((item) => {
                            if (item.day === 2 && renderDayByIndexKey(1) === item.startday) {
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
                                    </div>
                                    );
                            }
                                return null;
                            })}
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>{renderDayByIndex(2)}</div>

                        {data.map((item) => {
                            if (item.day === 3 && renderDayByIndexKey(2) === item.startday) {
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
                                    </div>
                                    );
                            }
                                return null;
                            })}
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>{renderDayByIndex(3)}</div>

                        {data.map((item) => {
                            if (item.day === 4 && renderDayByIndexKey(3) === item.startday) {
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
                                    </div>
                                    );
                            }
                                return null;
                            })}
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>{renderDayByIndex(4)}</div>

                        {data.map((item) => {
                            if (item.day === 5 && renderDayByIndexKey(4) === item.startday) {
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
                                    </div>
                                    );
                            }
                                return null;
                            })}
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>{renderDayByIndex(5)}</div>

                        {data.map((item) => {
                            if (item.day === 6 && renderDayByIndexKey(5) === item.startday) {
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
                                    </div>
                                    );
                            }
                                return null;
                            })}
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>{renderDayByIndex(6)}</div>

                        {data.map((item) => {
                            if (item.day === 7 && renderDayByIndexKey(6) === item.startday) {
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
                                    </div>
                                    );
                            }
                                return null;
                            })}
                    </div>
                </div>
            </div>

            <footer className='footer-set align-center'>
                <div>create by OYR 1조</div>
                <div>email: OpenYearRound@naver.com</div>
            </footer>
    </div>)
}

export default SchedulePage;