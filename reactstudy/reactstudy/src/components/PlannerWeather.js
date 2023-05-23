import './PlannerWeather.css'


function PlannerWeather() {
    return (<div>
        <div className='modal_background'></div>
        <div className="modal_wrap">
            <div className="modal_textset">
                <div className="modal-title">도쿄</div>
                
                <div className='align-center week-weather-set'>
                    <button className='week-left-btn'>이전주</button>
                    <div className='align-center week-weather'>
                        <div className='weather-tag align-center'>
                            <div className='weather-tag-item align-center '>요일</div>
                            <div className='weather-tag-item align-center '>월(7/11)</div>
                            <div className='weather-tag-item align-center '>화(7/12)</div>
                            <div className='weather-tag-item align-center '>수(7/13)</div>
                            <div className='weather-tag-item align-center '>목(7/14)</div>
                            <div className='weather-tag-item align-center '>금(7/15)</div>
                            <div className='weather-tag-item align-center '>토(7/16)</div>
                            <div className='weather-tag-item align-center '>일(7/17)</div>
                       </div>
                       <div className='weather-list-tag align-center'>
                            <div className='weather-list-item align-center '>날씨</div>
                            <div className='weather-list-item align-center '>11</div>
                            <div className='weather-list-item align-center '>날씨</div>
                            <div className='weather-list-item align-center '>날씨</div>
                            <div className='weather-list-item align-center '>날씨</div>
                            <div className='weather-list-item align-center '>날씨</div>
                            <div className='weather-list-item align-center '>날씨</div>
                            <div className='weather-list-item align-center '>날씨</div>
                       </div>
                    </div>
                    <button className='week-right-btn'>다음주</button>
                </div>
                <div className='align-center weather-commment'>
                    <div>~월 평균 기온: 29.7</div>
                    <div>덥고 습합니다. 우기이기 때문에 갑작스러운 소나기 대비해서 우산 챙기세요! </div>
                </div>
            </div>      
        </div>
        
    </div>)
}

export default PlannerWeather;