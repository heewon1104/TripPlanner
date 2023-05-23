import './ExpenseCalculationAndSupplies.css'

function ExpenseCalculationAndSupplies() {
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

        <div className='main-set align-center'>
            <div className='calculator-set align-center border-right'>
                <div className='align-center expenseCalculatorTitle'>플래너1 경비 계산</div>
                <div className='align-center expenseCalculatoradddiv'>
                    <button className='expenseCalculatoraddbtn'>항목 추가</button>
                </div>
                <div className='align-center expenseCalculator'> 
                    <div className='expense-item align-center'>
                        <div className='expense-item-title align-center'>비행기 경비</div>
                        <div className='expense-item-amount align-center'>50000</div>
                    </div>
                    <div className='expense-item align-center'>
                        <div className='expense-item-title align-center'>숙소 비용</div>
                        <div className='expense-item-amount align-center'>60000</div>
                    </div>
                </div>
            </div>

            <div className='calculator-set align-center'>
                <div className='align-center expenseCalculatorTitle'>플래너1 준비물</div>
                <div className='align-center expenseCalculatoradddiv'>
                    <button className='noteaddbtn'>항목 추가</button>
                </div>
                <div className='align-center expenseCalculator'> 
                    <div className='expense-item align-center'>
                        <div className='note-item-check align-center'>V</div>
                        <div className='note-item-title align-center'>준비물 1</div>
                    </div>
                    <div className='expense-item align-center'>
                        <div className='note-item-check align-center'>X</div>
                        <div className='note-item-title align-center'>준비물 2</div>
                    </div>
                </div>
            </div>
        </div>

        <footer className='footer-set align-center'>
            <div>create by OYR 1조</div>
            <div>email: OpenYearRound@naver.com</div> 
        </footer>
    </div>)
}

export default ExpenseCalculationAndSupplies;