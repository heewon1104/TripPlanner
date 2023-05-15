import './ExpenseItem.css'

function ExpenseItem() {
    return (<div className='All align-center'>
        <header className='header-set align-center'>
            <div className='align-center Title'>Trip planner</div>
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
                <div className='schdule-tag align-center'>
                    <div className='schdule-item align-center'>시간/요일</div>
                    <div className='schdule-item align-center'>월</div>
                    <div className='schdule-item align-center'>화</div>
                    <div className='schdule-item align-center'>수</div>
                    <div className='schdule-item align-center'>목</div>
                    <div className='schdule-item align-center'>금</div>
                    <div className='schdule-item align-center'>토</div>
                    <div className='schdule-item align-center'>일</div>
                </div>
                <div className='schdule-content align-center'>
                    <div>
                        <div className='schdule-item align-center'>00시</div>
                        <div className='schdule-item align-center'>01시</div>
                        <div className='schdule-item align-center'>02시</div>
                        <div className='schdule-item align-center'>03시</div>
                        <div className='schdule-item align-center'>04시</div>
                        <div className='schdule-item align-center'>05시</div>
                        <div className='schdule-item align-center'>06시</div>
                        <div className='schdule-item align-center'>07시</div>
                        <div className='schdule-item align-center'>08시</div>
                        <div className='schdule-item align-center'>09시</div>
                        <div className='schdule-item align-center'>10시</div>
                        <div className='schdule-item align-center'>11시</div>
                        <div className='schdule-item align-center'>12시</div>
                        <div className='schdule-item align-center'>13시</div>
                        <div className='schdule-item align-center'>14시</div>
                        <div className='schdule-item align-center'>15시</div>
                        <div className='schdule-item align-center'>16시</div>
                        <div className='schdule-item align-center'>17시</div>
                        <div className='schdule-item align-center'>18시</div>
                        <div className='schdule-item align-center'>19시</div>
                        <div className='schdule-item align-center'>20시</div>
                        <div className='schdule-item align-center'>21시</div>
                        <div className='schdule-item align-center'>22시</div>
                        <div className='schdule-item align-center'>23시</div>
                    </div>
                    <div className='schdule-content-list align-center'>월</div>
                    <div className='schdule-content-list align-center'>화</div>
                    <div className='schdule-content-list align-center'>수</div>
                    <div className='schdule-content-list align-center'>목</div>
                    <div className='schdule-content-list align-center'>금</div>
                    <div className='schdule-content-list align-center'>토</div>
                    <div className='schdule-content-list align-center'>일</div>
                </div>
            </div>

            <footer className='footer-set align-center'>
                <div>create by OYR 1조</div>
                <div>email: OpenYearRound@naver.com</div> 
            </footer>
    </div>)
}

export default ExpenseItem;