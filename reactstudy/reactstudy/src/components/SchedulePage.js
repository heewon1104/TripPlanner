import './SchedulePage.css'

function SchedulePage() {
    return (<div className='All align-center'>
        <header className='header-set align-center'>
            <div className='align-center Title'> </div>
            <div className='align-center Tag-list'>
                <div className='align-center Tag'>홈</div>
                <div className='align-center Tag'>플래너</div>
                <div className='align-center Tag'>경비계산 / 준비물</div>
                <div className='align-center Tag'>관광지</div>
                <div className='align-center Tag'>커뮤니티</div>
                <div className='align-center Tag'>오류문의</div>
            </div>
        </header>

        <div id="schedlue-set" className='schdule-set align-center'>
            <div className='title-list align-center'>
                <div className="schdule-title">시간표 1</div>
                <button className='weather-button'> 해당도시 날씨 확인하기</button>
            </div>
            <div className="week-button-list align-center">
                <button className="week-button-prev">이전주</button>
                <button className="week-button-next">다음주</button>
            </div>
            <div className="week-button-list align-center">
                <button className="add-schedule-item">시간표 추가</button>
                <button className="add-transportation">이동수단 확인</button>
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
                        <div className='week-top align-center'>월</div>

                        <div className='schdule-content-list align-center'>임시</div>
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>화</div>

                        <div className='schdule-content-list align-center'>임시</div>
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>수</div>

                        <div className='schdule-content-list align-center'>임시</div>
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>목</div>

                        <div className='schdule-content-list align-center'>임시</div>
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>금</div>

                        <div className='schdule-content-list align-center'>임시</div>
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>토</div>

                        <div className='schdule-content-list align-center'>임시</div>
                    </div>
                    <div className='schdule-item align-center border-right-gray'>
                        <div className='week-top align-center'>일</div>

                        <div className='schdule-content-list align-center'>임시</div>
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