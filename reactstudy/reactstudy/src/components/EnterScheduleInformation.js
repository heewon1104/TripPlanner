import './EnterScheduleInformation.css'


function EnterScheduleInformation() {
    return (<div>
        <div className='modal_background'></div>
        <div className="modal_wrap">
            <div className="modal_textset">
                <div className="modal-title">여행 정보 입력</div>

                <div className="modal_textset-column">
                    <div className="modal_text">출국 날짜 :</div>
                    <input className='input-design' name='Date'/>
                </div>
                <div className="modal_textset-column">
                    <div className="modal_text">입국 날짜 :</div>
                    <input className='input-design' name='Date'/>
                </div>
                <div className="modal_textset-column">
                    <div className="modal_text">여행 국가 :</div>
                    <input className='input-design' name='이탈리아'/>
                </div>
                <div className="modal_textset-column">
                    <div className="modal_text">여행 도시 :</div>
                    <input className='input-design' name='로마'/>
                </div>

                <button className="submit-btn">저장</button>
            </div>      
        </div>
        
    </div>)
}

export default EnterScheduleInformation;