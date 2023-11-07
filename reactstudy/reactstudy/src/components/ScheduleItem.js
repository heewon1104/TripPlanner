/*global google*/

import React, { useEffect } from 'react';
import { useState } from 'react';
import './ScheduleItem.css'

function ScheduleItem({ isOpen, closeModal, onSave, editedSchedule, addNewSchedule, scheduleData }) {

  const [selectedPlace, setSelectedPlace] = useState('');
  const [start, setStart] = useState('');
  const [startday, setStartday] = useState('');
  const [starttime, setStarttime] = useState('');
  const [endtime, setEndtime] = useState('');

  useEffect(() => {
    function initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
        mapTypeControl: false,
      });
      const card = document.getElementById("pac-card");
      const input = document.getElementById("pac-input");
      const biasInputElement = document.getElementById("use-location-bias");
      const strictBoundsInputElement = document.getElementById("use-strict-bounds");
      const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
      };

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

      const autocomplete = new google.maps.places.Autocomplete(input, options);

      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo("bounds", map);

      const infowindow = new google.maps.InfoWindow();
      const infowindowContent = document.getElementById("infowindow-content");

      infowindow.setContent(infowindowContent);

      const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
      });

      autocomplete.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);

        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          setSelectedPlace(place.name);

          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent =
          place.formatted_address;
        infowindow.open(map, marker);

        // 선택한 장소로 지도 이동
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        setSelectedPlace(place.name);
        setStart(place.name);
      });

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      function setupClickListener(id, types) {
        const radioButton = document.getElementById(id);

        radioButton.addEventListener("click", () => {
          autocomplete.setTypes(types);
          input.value = "";
        });
      }

      setupClickListener("changetype-all", []);
      setupClickListener("changetype-address", ["address"]);
      setupClickListener("changetype-establishment", ["establishment"]);
      setupClickListener("changetype-geocode", ["geocode"]);
      setupClickListener("changetype-cities", ["(cities)"]);
      setupClickListener("changetype-regions", ["(regions)"]);
      biasInputElement.addEventListener("change", () => {
        if (biasInputElement.checked) {
          autocomplete.bindTo("bounds", map);
        } else {
          // User wants to turn off location bias, so three things need to happen:
          // 1. Unbind from map
          // 2. Reset the bounds to whole world
          // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
          autocomplete.unbind("bounds");
          autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
          strictBoundsInputElement.checked = biasInputElement.checked;
        }

        input.value = "";
      });
      strictBoundsInputElement.addEventListener("change", () => {
        autocomplete.setOptions({
          strictBounds: strictBoundsInputElement.checked,
        });
        if (strictBoundsInputElement.checked) {
          biasInputElement.checked = strictBoundsInputElement.checked;
          autocomplete.bindTo("bounds", map);
        }

        input.value = "";
      });
    }

    // Load Google Maps API script and call initMap() when loaded
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAyZffxPv5S2NP2NEp_31-HH9XmDwSEWbM&callback=initMap&libraries=places&v=weekly`;
    script.defer = true;
    document.body.appendChild(script);

    // 이 부분을 useEffect 내부로 이동합니다.
    window.initMap = initMap;
  }, []);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [isOpen]);

  useEffect(() => {
    if (editedSchedule) {
      // If there is an editedSchedule provided, initialize the form fields with its values
      setSelectedPlace(editedSchedule.start);
      setStartday(editedSchedule.startday);
      setStarttime(editedSchedule.starttime);
      setEndtime(editedSchedule.endtime);
    } else {
      // Clear the form fields if there is no editedSchedule
      setSelectedPlace('');
      setStartday('');
      setStarttime('');
      setEndtime('');
    }
  }, [editedSchedule]);

  const handleChangeStart = (event) => setStart(event.target.value);
  const handleChangeStartday = (event) => setStartday(event.target.value);
  const handleChangeStarttime = (event) => setStarttime(event.target.value);
  const handleChangeEndtime = (event) => setEndtime(event.target.value);

  function timeToMinutes(time) {
    if (!time) {
      return 0; // or some default value based on your use case
    }

    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    return totalMinutes;
  }

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


  const handleSave = (event) => {
    event.preventDefault(); // 폼 전송 막기

    // Validate user input
    if (selectedPlace.trim() === '') {
      window.alert("장소를 입력하세요.");
      return;
    }

    if (startday === '' || starttime === '' || endtime === '') {
      window.alert("날짜와 시간을 모두 입력하세요.");
      return;
    }

    const startTimeInMinutes = timeToMinutes(starttime);
    const endTimeInMinutes = timeToMinutes(endtime);

    if (startTimeInMinutes >= endTimeInMinutes) {
      window.alert("시작 시간은 종료 시간보다 빨라야 합니다.");
      return;
    }

    const isOverlap = scheduleData.some((schedule) => {
      // Parse schedule start time and end time
      const scheduleStartTime = schedule.start_time; // "18:10:00" 형식의 문자열
      const scheduleEndTime = schedule.end_time; // "18:10:00" 형식의 문자열

      // Parse user input start time and end time
      const userStartTime = starttime; // "18:10:00" 형식의 문자열
      const userEndTime = endtime; // "18:10:00" 형식의 문자열

      const isSameDate = new Date(startday).toDateString() === new Date(schedule.startday).toDateString();


      // 입력된 값의 종료 시간이 해당 날짜에 있던 시간표의 시작 시간과 종료 시간 사이에 있는 경우
      const isEndTimeOverlap =
        isSameDate &&
        userEndTime > scheduleStartTime &&
        userEndTime <= scheduleEndTime;

      // 입력된 값의 시작 시간이 해당 날짜에 있던 시간표의 시작 시간과 종료 시간 사이에 있는 경우
      const isStartTimeOverlap =
        isSameDate &&
        userStartTime >= scheduleStartTime &&
        userStartTime < scheduleEndTime;

      // 입력된 값의 시작 시간이 해당 날짜에 있던 시간표의 시작 시간보다 빠르고
      // 입력된 값의 종료 시간이 해당 날짜에 있던 시간표의 종료 시간보다 느릴 때
      const isStartTimeBeforeAndEndTimeAfter =
        isSameDate &&
        userStartTime < scheduleStartTime &&
        userEndTime > scheduleEndTime;

      console.log(isEndTimeOverlap, isStartTimeOverlap, isStartTimeBeforeAndEndTimeAfter);

      return isEndTimeOverlap || isStartTimeOverlap || isStartTimeBeforeAndEndTimeAfter;
    });

    console.log(isOverlap);

    if (isOverlap) {
      window.alert("이미 일정과 겹칩니다.");
      return;
    }


    // 데이터를 서버로 보낼 객체 생성
    const requestData = {
      start: selectedPlace,
      startday: startday,
      starttime: starttime,
      endtime: endtime,
      planner_id: 0,
      user_id: 0,
    };

    // 원하는 정보 추가
    requestData.index = 0; // 적절한 인덱스 값으로 설정하세요
    requestData.day = getDayOfWeek(requestData.startday);
    requestData.subtime = subtractTimes(requestData.endtime, requestData.starttime);
    requestData.topmargin = timeToMinutes(requestData.starttime);

    // 서버로 데이터 전송
    const serverHost = 'http://localhost'; // 클라이언트와 서버가 같은 컴퓨터에서 실행되는 경우
    const serverPort = 80; // 서버가 3000번 포트에서 실행되고 있는 경우

    fetch(`${serverHost}:${serverPort}/api/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // JSON 형식으로 파싱
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((result) => {
        console.log('데이터 전송 성공:', result);
        // 필요한 경우, 성공한 후의 동작을 정의합니다.
      })
      .catch((error) => {
        console.error('데이터 전송 오류:', error);
        // 필요한 경우, 오류 처리를 정의합니다.
      });

    addNewSchedule(requestData);

    closeModal();
  };




  return (<div style={{ display: isOpen ? "block" : "none" }}>
    <div className='modal_background' onClick={closeModal}></div>
    <div className="modal-title">
    </div>
    <div className="Smodal_wrap">
      <div className="modal_textset">
        <form>
          <div className="Smodal-title align-center">일정 추가</div>
          <div className='content-set'>

            <div className='textsets'>
              <div className='input-column-location align-center'>
                <div className='input-column-text'>장소</div>
                <div className="input-column-content align-center">
                  <input
                    className="input-design"
                    name="start"
                    value={selectedPlace}
                    onChange={(event) => setSelectedPlace(event.target.value)}
                  />
                  <div className="input-result-text">{selectedPlace}</div>
                </div>
              </div>
              <div className='input-column align-center'>
                <div className='input-column-text'>시간</div>
                <div className='input-column-content'>

                  <div className='input-column-content-starttime align-center'>
                    <div className='input-column-content-starttime-title'>시작 시간</div>

                    <div className='input-column-content-starttime-content align-center'>
                      <div className='input-column-content-starttime-date align-center'>
                        <input className='input-column-content-starttime-date-text' name='SDate' type='date' onChange={handleChangeStartday} />
                      </div>
                      <div className='input-column-content-starttime-time align-center'>
                        <input className='input-column-content-starttime-date-text' name='SHour' type='time' onChange={handleChangeStarttime} />
                      </div>
                    </div>
                  </div>

                  <div className='input-column-content-starttime align-center'>
                    <div className='input-column-content-starttime-title'>종료 시간</div>

                    <div className='input-column-content-starttime-content align-center'>
                      <div className='input-column-content-starttime-date align-center'>
                      </div>
                      <div className='input-column-content-starttime-time align-center'>
                        <input className='input-column-content-starttime-date-text' name='SHour' type='time' onChange={handleChangeEndtime} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className='maps'>
              <div>
                <title>Place Autocomplete</title>
                <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
                <script type="module" src="./index.js"></script>
              </div>
              <div>
                <div className="pac-card" id="pac-card">
                  <div>
                    <div id="title">Autocomplete search</div>
                    <div id="type-selector" className="pac-controls">
                      <input
                        type="radio"
                        name="type"
                        id="changetype-all"
                        defaultChecked
                      />
                      <label htmlFor="changetype-all">All</label>

                      <input type="radio" name="type" id="changetype-establishment" />
                      <label htmlFor="changetype-establishment">establishment</label>

                      <input type="radio" name="type" id="changetype-address" />
                      <label htmlFor="changetype-address">address</label>

                      <input type="radio" name="type" id="changetype-geocode" />
                      <label htmlFor="changetype-geocode">geocode</label>

                      <input type="radio" name="type" id="changetype-cities" />
                      <label htmlFor="changetype-cities">(cities)</label>

                      <input type="radio" name="type" id="changetype-regions" />
                      <label htmlFor="changetype-regions">(regions)</label>
                    </div>
                    <br />
                    <div id="strict-bounds-selector" className="pac-controls">
                      <input type="checkbox" id="use-location-bias" defaultChecked />
                      <label htmlFor="use-location-bias">Bias to map viewport</label>

                      <input type="checkbox" id="use-strict-bounds" defaultChecked />
                      <label htmlFor="use-strict-bounds">Strict bounds</label>
                    </div>
                  </div>
                  <div id="pac-container">
                    <input id="pac-input" type="text" placeholder="Enter a location" value={start} onChange={handleChangeStart} />
                  </div>
                </div>
                <div id="map"></div>
                <div id="infowindow-content">
                  <span id="place-name" className="title"></span>
                  <br />
                  <span id="place-address"></span>
                </div>
              </div>
            </div>
          </div>
          <button className="submitbtn" type="submit" onClick={handleSave}>제출</button>
        </form>
      </div>
    </div>

  </div>)
}

export default ScheduleItem;


//https://www.google.co.kr/maps/dir/

