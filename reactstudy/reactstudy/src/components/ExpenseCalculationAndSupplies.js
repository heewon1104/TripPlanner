import './ExpenseCalculationAndSupplies.css'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function ExpenseCalculationAndSupplies() {
    const navigate = useNavigate();

    const goTomain = () => {
        navigate("/main");
    }

    const [expenseData, setExpenseData] = useState([]);
    const [suppliesData, setSuppliesData] = useState([]);

    // 경비 계산 모달창
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [expenseTitle, setExpenseTitle] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');

    const openExpenseModal = () => {
        setShowExpenseModal(true);
    };

    const closeExpenseModal = () => {
        setShowExpenseModal(false);
        setExpenseTitle('');
        setExpenseAmount('');
    };

    const handleExpenseTitleChange = (event) => {
        setExpenseTitle(event.target.value);
    };

    const handleExpenseAmountChange = (event) => {
        setExpenseAmount(event.target.value);
    };

    const handleAddExpense = () => {
        if (expenseTitle && expenseAmount) {
            const newExpense = {
                title: expenseTitle,
                amount: expenseAmount
            };
            setExpenseData([...expenseData, newExpense]);
            closeExpenseModal();
        }
    };

    // 준비물 입력 모달창
    const [showSuppliesModal, setShowSuppliesModal] = useState(false);
    const [suppliesTitle, setSuppliesTitle] = useState('');

    const openSuppliesModal = () => {
        setShowSuppliesModal(true);
    };

    const closeSuppliesModal = () => {
        setShowSuppliesModal(false);
        setSuppliesTitle('');
    };

    const handleSuppliesTitleChange = (event) => {
        setSuppliesTitle(event.target.value);
    };

    const handleAddSupplies = () => {
        if (suppliesTitle) {
            const newSupplies = {
                title: suppliesTitle,
                checked: false  // 초기 체크 상태를 false로 설정
            };
            setSuppliesData([...suppliesData, newSupplies]);
            closeSuppliesModal();
        }
    };

    const handleCheckChange = (index) => {
        const updatedSupplies = suppliesData.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    checked: !item.checked
                };
            }
            return item;
        });

        setSuppliesData(updatedSupplies);
    };

    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        const expenseCalculator = document.querySelector('.expenseCalculator');
        if (expenseCalculator.scrollHeight > expenseCalculator.clientHeight) {
            setIsOverflow(true);
        } else {
            setIsOverflow(false);
        }
    }, [expenseData]);

    
    return (<div className='All align-center'>
        <header className='header-set align-center'>
            <div className='Title'> </div>
            <div className='Tag-list'>
                <div className='Tag'>홈</div>
                <div className='Tag' onClick={goTomain}>플래너</div>
                <div className='Tag'>경비계산 / 준비물</div>
                <div className='Tag'>관광지</div>
                <div className='Tag'>커뮤니티</div>
                <div className='Tag'>오류문의</div>
            </div>
        </header>

        <div className='main-set'>
        <div className='calculator-set border-right'>
        <div className='expenseCalculatorTitle'>플래너1 경비 계산</div>
            <div className='expenseCalculatoradddiv'>
                    <button className='expenseCalculatoraddbtn' onClick={openExpenseModal}>항목 추가</button>
                </div>
                <div className='expenseCalculator'>
                    {expenseData.map((item, index) => (
                        <div className='expense-item' key={index}>
                            <div className='expense-item-title'>{item.title}</div>
                            <div className='expense-item-amount'>{item.amount}원</div>
                        </div>
                    ))}
                    <div className='expense-item'>
                        <div className='expense-item-title'>합계</div>
                        <div className='expense-item-amount'>
                            {expenseData.reduce((total, item) => total + parseInt(item.amount), 0)} 원
                        </div>
                    </div>
                </div>
            </div>
            <div className='calculator-set'>
                <div className='align-center expenseCalculatorTitle'>플래너1 준비물</div>
                <div className='align-center expenseCalculatoradddiv'>
                    <button className='noteaddbtn' onClick={openSuppliesModal}>항목 추가</button>
                </div>
                <div className='expenseCalculator'>
                    {suppliesData.map((item, index) => (
                        <div className='expense-item' key={index}>
                            <input
                                type='checkbox'
                                className='note-item-check'
                                checked={item.checked}
                                onChange={() => handleCheckChange(index)}
                            />
                            <div className='note-item-title'>{item.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {showExpenseModal && (
            <div className='modal'>
                <div className='modal-content'>
                    <span className='close' onClick={closeExpenseModal}>
                        &times;
                    </span>
                    <div>
                        <h2>경비 항목 추가</h2>
                        <input
                            type='text'
                            placeholder='항목명'
                            value={expenseTitle}
                            onChange={handleExpenseTitleChange}
                        />
                        <input
                            type='number'
                            placeholder='비용'
                            value={expenseAmount}
                            onChange={handleExpenseAmountChange}
                        />
                        <button onClick={handleAddExpense}>추가</button>
                    </div>
                </div>
            </div>
        )}

        {showSuppliesModal && (
            <div className='modal'>
                <div className='modal-content'>
                    <span className='close' onClick={closeSuppliesModal}>
                        &times;
                    </span>
                    <div>
                        <h2>준비물 항목 추가</h2>
                        <input
                            type='text'
                            placeholder='항목명'
                            defaultValue={suppliesTitle} 
                            onChange={handleSuppliesTitleChange}
                        />
                        <button onClick={handleAddSupplies}>추가</button>
                    </div>
                </div>
            </div>
        )}


        <footer className='footer-set'>
            <div>create by OYR 1조</div>
            <div>email: OpenYearRound@naver.com</div> 
        </footer>
    </div>)
}

export default ExpenseCalculationAndSupplies;