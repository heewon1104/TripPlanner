/*global google*/

import React, { useEffect } from 'react';
import { useState } from 'react';
import './ScheduleItem.css'

function ScheduleItem({isOpen, closeModal, onSave})  {

    const [selectedPlace, setSelectedPlace] = useState('');
    const [start, setStart] = useState('');
    const [startday, setStartday] = useState('');
    const [starttime, setStarttime] = useState('');
    const [endday, setEndday] = useState('');
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

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      }, [isOpen]);

    const handleChangeStart = (event) => setStart(event.target.value);
    const handleChangeStartday = (event) => setStartday(event.target.value);
    const handleChangeStarttime = (event) => setStarttime(event.target.value);
    const handleChangeEndday = (event) => setEndday(event.target.value);
    const handleChangeEndtime = (event) => setEndtime(event.target.value);
    

    const handleSave = (event) => {
        event.preventDefault(); // 폼 전송 막기


        onSave({
            start: start,

            startday: startday,
            starttime: starttime,

            endday: endday,
            endtime: endtime
          });
      };

    return (<div  style={{ display: isOpen ? "block" : "none" }}>
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
                                                <input className='input-column-content-starttime-date-text' name='SDate' type='date' onChange={handleChangeStartday}/>
                                            </div>
                                            <div className='input-column-content-starttime-time align-center'>
                                                <input className='input-column-content-starttime-date-text' name='SHour' type='time'  onChange={handleChangeStarttime}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='input-column-content-starttime align-center'>
                                        <div className='input-column-content-starttime-title'>종료 시간</div>

                                        <div className='input-column-content-starttime-content align-center'>
                                            <div className='input-column-content-starttime-date align-center'>
                                                <input className='input-column-content-starttime-date-text' name='SDate' type='date' onChange={handleChangeEndday}/>
                                            </div>
                                            <div className='input-column-content-starttime-time align-center'>
                                                <input className='input-column-content-starttime-date-text' name='SHour' type='time' onChange={handleChangeEndtime}/>
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
                                    <input id="pac-input" type="text" placeholder="Enter a location" value={start} onChange={handleChangeStart}/>
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
                    <button className = "submitbtn" type="submit" onClick={handleSave}>제출</button>
                </form>
            </div>      
        </div>
        
    </div>)
}

export default ScheduleItem;


//https://www.google.co.kr/maps/dir/