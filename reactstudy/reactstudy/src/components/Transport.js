import './Transport.css'


function Transport({isOpen, closeModal}) {

    return (<div style={{ display: isOpen ? "block" : "none" }}>
        <div className='modal_background' onClick={closeModal}></div>
        <div className="Tmodal_wrap align-center">
            <div className="modal_transportset align-center">
                <div className='modal_transportset-map align-center'>

                </div>
                <div className='modal_transportset-textset align-center'>
                    <input className='startpoint-design' name='Date'/>
                    <input className='destination-design' name='Date'/>
                    <div className='destination-method align-center'>
                        <button className='transport-method-btn'>자가용</button>
                        <button className='transport-method-btn'>대중교통</button>
                        <button className='transport-method-btn'>도보</button>
                    </div>
                    <div className='destination-list align-center'>
                        <div className='destination-list-item align-center'>
                            <div className='destination-list-item-title align-center'>대중교통1</div>
                            <div className='destination-list-item-time align-center'>50분</div>
                        </div>
                        <div className='destination-list-item align-center'>
                            <div className='destination-list-item-title align-center'>대중교통2</div>
                            <div className='destination-list-item-time align-center'>60분</div>
                        </div>
                        <div className='destination-list-item align-center'>
                            <div className='destination-list-item-title align-center'>대중교통3</div>
                            <div className='destination-list-item-time align-center'>20분</div>
                        </div>
                        <div className='destination-list-item align-center'>
                            <div className='destination-list-item-title align-center'>대중교통4</div>
                            <div className='destination-list-item-time align-center'>30분</div>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
        
    </div>)
}

export default Transport;