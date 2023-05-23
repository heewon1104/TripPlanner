import './ScheduleItem.css'


function ScheduleItem() {
    return (<div>
        <div className='modal_background'></div>
        <div className="modal_wrap">
            <div className="modal_textset">
                <div className="modal-title align-center">일정 추가</div>

                <div className='content-set'>
                    <div className='input-column-location align-center'>
                        <div className='input-column-text'>출발지</div>
                        <div className='input-column-content align-center'> 
                            <input className='input-design' name='Date'/>
                            <div className='input-result-text'>간사이 국제 공항</div>
                        </div>
                    </div>
                    <div className='input-column-location align-center'>
                        <div className='input-column-text'>도착지</div>
                        <div className='input-column-content align-center'> 
                            <input className='input-design' name='Date'/>
                            <div className='input-result-text'>오사카 국제 공항</div>
                        </div>
                    </div>
                    <div className='input-column align-center'>
                        <div className='input-column-text'>시간</div>
                        <div className='input-column-content align-center'>

                            <div className='input-column-content-starttime align-center'>
                                <div className='input-column-content-starttime-title'>시작 시간</div>

                                <div className='input-column-content-starttime-content align-center'>
                                    <div className='input-column-content-starttime-date align-center'>
                                        <input className='input-column-content-starttime-date-text' name='Date'/>
                                    </div>
                                    <div className='input-column-content-starttime-time align-center'>
                                        <input className='input-column-content-starttime-time-text' name='Hour'/>
                                        <input className='input-column-content-starttime-time-text' name='Time'/>
                                    </div>
                                </div>
                            </div>

                            <div className='input-column-content-starttime align-center'>
                                <div className='input-column-content-starttime-title'>종료 시간</div>

                                <div className='input-column-content-starttime-content align-center'>
                                    <div className='input-column-content-starttime-date align-center'>
                                        <input className='input-column-content-starttime-date-text' name='Date'/>
                                    </div>
                                    <div className='input-column-content-starttime-time align-center'>
                                        <input className='input-column-content-starttime-time-text' name='Hour'/>
                                        <input className='input-column-content-starttime-time-text' name='Time'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
        
    </div>)
}

export default ScheduleItem;