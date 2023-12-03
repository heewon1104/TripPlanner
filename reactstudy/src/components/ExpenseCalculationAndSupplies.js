import styles from './ExpenseCalculationAndSupplies.module.css'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../header";

import { getUserInfo } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function ExpenseCalculationAndSupplies() {
    const userInfo = useSelector((state) => state.user);
    const getUser = getUserInfo();

    const serverHost = "http://13.239.138.191"; // 클라이언트와 서버가 같은 컴퓨터에서 실행되는 경우
    const serverPort = 82; // 서버가 3000번 포트에서 실행되고 있는 경우
    const user_id = getUser.signup_id;
    const [selectedExpenseIndex, setSelectedExpenseIndex] = useState(-1);
    const [selectedSuppliesIndex, setSelectedSuppliesIndex] = useState(-1);

    const navigate = useNavigate();

    useEffect(() => {
        const result = getUserInfo();

        if(result.signup_id == null){
        alert("로그인 후 이용가능합니다");
        navigate("/");
        }
    }, [userInfo]); 

    const [expenseData, setExpenseData] = useState([]);
    const [suppliesData, setSuppliesData] = useState([]);

    // 경비 계산 모달창
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [showEditExpenseModal, setShowEditExpenseModal] = useState(false); // 수정용 모달 상태 추가
    const [expenseTitle, setExpenseTitle] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');

    const openExpenseModal = () => {
        setShowExpenseModal(true);
    };

    const closeExpenseModal = () => {
        setShowExpenseModal(false);
        setShowEditExpenseModal(false); 
        setExpenseTitle('');
        setExpenseAmount('');
    };
    // 추가용 모달 열기
    const openAddExpenseModal = () => {
        setShowExpenseModal(true); // 추가 모달을 열 때도 setShowExpenseModal을 사용
    };

    // 추가용 모달 창 닫기
    const closeAddExpenseModal = () => {
        setShowExpenseModal(false); // 추가 모달을 닫을 때도 setShowExpenseModal을 사용
        setExpenseTitle('');
        setExpenseAmount('');
    };

    // 수정용 모달 열기
    const openExpenseModalForEdit = (index) => {
        setSelectedExpenseIndex(index); // 수정할 항목의 인덱스 저장
        setShowEditExpenseModal(true); // 수정용 모달 열기
        // 선택한 항목의 내용을 모달에 불러와서 입력란에 채워 넣을 수 있도록 구현
        const selectedItem = expenseData[index];
        setExpenseTitle(selectedItem.title);
        setExpenseAmount(selectedItem.budget);
    };


    const closeEditExpenseModal = () => {
        setShowEditExpenseModal(false);
        setExpenseTitle('');
        setExpenseAmount('');
    };
    

    const handleExpenseTitleChange = (event) => {
        setExpenseTitle(event.target.value);
    };

    const handleExpenseAmountChange = (event) => {
        setExpenseAmount(event.target.value);
    };

    // 수정용 모달창 내용 변경 핸들러
    const handleEditExpenseTitleChange = (event) => {
        setExpenseTitle(event.target.value);
    };

    const handleEditExpenseAmountChange = (event) => {
        setExpenseAmount(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverHost}:${serverPort}/api/expense`, {
                    params: {
                        user_id: user_id // user_id를 서버로 전달
                    }
                });
                const fetchedData = response.data; // API 응답 데이터

                // 데이터 업데이트
                setExpenseData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // 페이지 로드 시 데이터를 가져옴
    }, [user_id]);

    // 추가 기능 업데이트
    const handleAddExpense = async () => {
        if (expenseTitle && expenseAmount) {
            const newExpense = {
                title: expenseTitle,
                budget: expenseAmount,
                user_id: getUser.signup_id,
                planner_id: 0
            };

            try {
                // API 엔드포인트와 데이터 구조에 맞게 POST 요청 보내기
                fetch(`${serverHost}:${serverPort}/api/expense`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newExpense),
                })

            } catch (error) {
                console.error('Error adding expense:', error);
            }

            setExpenseData([...expenseData, newExpense]);
            closeExpenseModal();
        }
    };

    const handleEditExpense = async () => {
        if (selectedExpenseIndex !== -1 && expenseTitle && expenseAmount) {
            const originalExpense = expenseData[selectedExpenseIndex]; // 원래 항목 데이터

            const updatedExpense = {
                ...originalExpense, // 원래 값 유지
                edittitle: expenseTitle, // 수정할 값
                editbudget: expenseAmount, // 수정할 값
            };


            try {
                fetch(`${serverHost}:${serverPort}/api/updateexpense`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedExpense),
                });
            } catch (error) {
                console.error('Error updating expense:', error);
            }
    
            // 수정된 내용으로 expenseData 업데이트
            setExpenseData((prevExpenseData) => {
                const updatedData = [...prevExpenseData];
                updatedData[selectedExpenseIndex].title = updatedExpense.edittitle;
                updatedData[selectedExpenseIndex].budget = updatedExpense.editbudget;
                return updatedData;
            });
    
            // 모달 닫기 및 입력란 초기화
            closeEditExpenseModal();
        }
    };

    // 항목 삭제 기능 추가
    const handleDeleteExpense = async (index) => {
        if (index !== -1) {
            const expenseToDelete = expenseData[index]; // 삭제할 항목 가져오기

            const newExpense = {
                title: expenseToDelete.title,
                budget: expenseToDelete.budget,
                user_id: getUser.signup_id,
                planner_id: 0
            };

            try {
                fetch(`${serverHost}:${serverPort}/api/expense`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newExpense),
                })
            } catch (error) {
                console.error('Error deleting expense:', error);
            }

            // 해당 항목을 제외한 새로운 expenseData 생성
            setExpenseData((prevExpenseData) => {
                const updatedData = [...prevExpenseData];
                updatedData.splice(index, 1);
                return updatedData;
            });
        }
    };



    // 준비물 입력 모달창
    const [showSuppliesModal, setShowSuppliesModal] = useState(false); 
    const [suppliesTitle, setSuppliesTitle] = useState('');
    const [suppliesChecked, setExpenseChecked] = useState('');
    const [showEditSuppliesModal, setShowEditSuppliesModal] = useState(false);
    
    const fetchSuppliesData = async () => {
        try {
            const response = await fetch(`${serverHost}:${serverPort}/api/supplies?user_id=${user_id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const suppliesData = await response.json();
            setSuppliesData(suppliesData);
        } catch (error) {
            console.error('Error fetching supplies data:', error);
        }
    };


    // 수정용 모달 열기
    const openSuppliesModal = () => {
        setShowSuppliesModal(true);
    };

    const closeSuppliesModal = () => {
        setShowSuppliesModal(false);
        setShowEditSuppliesModal(false);
        setSuppliesTitle('');
        setExpenseChecked('0');
    };

    // handleCheckChange 함수 정의
    const handleCheckChange = async (index) => {
        const updatedData = [...suppliesData];
        const tmpchecked = updatedData[index].checked === 0 ? 1 : 0;

        // DB에 업데이트된 값을 보내는 부분
        const suppliesToUpdate = {
            ...updatedData[index],
            edittitle: updatedData[index].title,
            editchecked: tmpchecked,
        };

    try {
        await fetch(`${serverHost}:${serverPort}/api/updatesupplies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(suppliesToUpdate),
        });
    } catch (error) {
        console.error('Error updating supplies:', error);
    }

    updatedData[index].checked = tmpchecked;
    setSuppliesData(updatedData);
    };

    // handleAddSupplies 함수 정의
    const handleAddSupplies = async () => {
        if (suppliesTitle) {
            const newSupplies = {
                title: suppliesTitle,
                checked: 0,
                user_id: getUser.signup_id,
                planner_id: 0
            };
    
            try {
                await fetch(`${serverHost}:${serverPort}/api/supplies`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newSupplies),
                });
    
                fetchSuppliesData();
            } catch (error) {
                console.error('Error adding supplies:', error);
            }
    
            closeSuppliesModal();
        }
    };

     // 수정용 모달 열기
     const openSuppliesModalForEdit = (index) => {
        setSelectedSuppliesIndex(index); // 수정할 항목의 인덱스 저장
        setShowEditSuppliesModal(true); // 수정용 모달 열기
        // 선택한 항목의 내용을 모달에 불러와서 입력란에 채워 넣을 수 있도록 구현
        const selectedItem = suppliesData[index];
        setSuppliesTitle(selectedItem.title);
    };

    const closeEditSuppliesModal = () => {
        setShowEditSuppliesModal(false);
        setSuppliesTitle('');
    };

    const handleSuppliesTitleChange = (event) => {
        setSuppliesTitle(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverHost}:${serverPort}/api/supplies`, {
                    params: {
                        user_id: user_id
                    }
                });
                const fetchedData = response.data.map(item => ({
                    ...item,
                }));
    
                setSuppliesData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [user_id]);

    const handleEditSupplies = async () => {
        if (selectedSuppliesIndex !== -1 && suppliesTitle) {
            const originalSupplies = suppliesData[selectedSuppliesIndex]; // 원래 항목 데이터

            const updatedSupplies = {
                ...originalSupplies,
                edittitle: suppliesTitle,
                editchecked: originalSupplies.checked ? '1' : '0'
            };
            

            try {
                fetch(`${serverHost}:${serverPort}/api/updatesupplies`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedSupplies),
                });
            } catch (error) {
                console.error('Error updating supplies:', error);
            }
    
            setSuppliesData((prevSuppliesData) => {
                const updatedData = [...prevSuppliesData];
                updatedData[selectedSuppliesIndex].title = updatedSupplies.edittitle;
                return updatedData;
            });

    
            // 모달 닫기 및 입력란 초기화
            closeEditSuppliesModal();
        }
    };

    const handleDeleteSupplies = async (index) => {
        if (index !== -1) {
            const suppliesToDelete = suppliesData[index]; // 삭제할 항목 가져오기

            const newSupplies = {
                title: suppliesToDelete.title,
                checked: suppliesToDelete.checked,
                user_id: getUser.signup_id,
                planner_id: 0
            };

            try {
                fetch(`${serverHost}:${serverPort}/api/supplies`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newSupplies),
                })
            } catch (error) {
                console.error('Error deleting supplies:', error);
            }

            // 해당 항목을 제외한 새로운 expenseData 생성
            setSuppliesData((prevSuppliesData) => {
                const updatedData = [...prevSuppliesData];
                updatedData.splice(index, 1);
                return updatedData;
            });
        }
    };
    
    return (
        <div className={styles['All'] + ' ' + styles['align-center']}>
            <Header></Header>
    
            <div className={styles['main-set']}>
                <div className={styles['calculator-set'] + ' ' + styles['border-right']}>
                    <div className={styles['expenseCalculatorTitle']}>시간표1 경비 계산</div>
                    <div className={styles['expenseCalculatoradddiv']}>
                        <button className={styles['expenseCalculatoraddbtn']} onClick={openExpenseModal}>항목 추가</button>
                    </div>
                    <div className={styles['expenseCalculator']}>
                    {expenseData.map((item, index) => (
                        <div className={styles['expense-item']} key={index}>
                            <div className={styles['expense-item-title']}>{item.title}</div>
                            <div className={styles['expense-item-amount']}>{item.budget}원</div>
                            <button className={styles['expense-item-btn']} onClick={() => openExpenseModalForEdit(index)}>수정</button>
                            <button className={styles['expense-item-btn']} onClick={() => handleDeleteExpense(index)}>삭제</button> {/* 삭제 버튼 추가 */}
                        </div>
                    ))}
                        <div className={styles['expense-item-bottom']}>
                            <div className={styles['expense-item-title']}>합계</div>
                            <div className={styles['expense-item-amount-res']}>
                                {expenseData.reduce((total, item) => total + parseInt(item.budget), 0)} 원
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['calculator-set']}>
                    <div className={styles['align-center'] + ' ' + styles['expenseCalculatorTitle']}>시간표1 준비물</div>
                    <div className={styles['align-center'] + ' ' + styles['expenseCalculatoradddiv']}>
                        <button className={styles['noteaddbtn']} onClick={openSuppliesModal}>항목 추가</button>
                    </div>
                    <div className={styles['expenseCalculator']}>
                        {suppliesData.map((item, index) => (
                            <div className={styles['expense-item']} key={index}>
                                <input
                                    type='checkbox'
                                    className={styles['note-item-check']}
                                    checked={item.checked}
                                    onChange={() => handleCheckChange(index)}
                                />
                                <div className={styles['note-item-title']}>{item.title}</div>
                                <button className={styles['expense-item-btn']} onClick={() => openSuppliesModalForEdit(index)}>수정</button>
                                <button className={styles['expense-item-btn']} onClick={() => handleDeleteSupplies(index)}>삭제</button> {/* 삭제 버튼 추가 */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    
            
            {showExpenseModal && (
                <div className={styles['modal']}>
                    <div className={styles['modal-content']}>
                        <span className={styles['close']} onClick={closeExpenseModal}>
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
                            <button onClick={handleAddExpense}>저장</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditExpenseModal && (
                <div className={styles['modal']}>
                    <div className={styles['modal-content']}>
                        <span className={styles['close']} onClick={closeExpenseModal}>
                            &times;
                        </span>
                        <div>
                            <h2>경비 항목 수정</h2>
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
                            <button onClick={handleEditExpense}>저장</button>
                        </div>
                    </div>
                </div>
            )}
    
            {showSuppliesModal && (
                <div className={styles['modal']}>
                    <div className={styles['modal-content']}>
                        <span className={styles['close']} onClick={closeSuppliesModal}>
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

            {showEditSuppliesModal && (
                <div className={styles['modal']}>
                    <div className={styles['modal-content']}>
                        <span className={styles['close']} onClick={closeSuppliesModal}>
                            &times;
                        </span>
                        <div>
                            <h2>준비물 항목 수정</h2>
                            <input
                                type='text'
                                placeholder='항목명'
                                defaultValue={suppliesTitle} 
                                onChange={handleSuppliesTitleChange}
                            />
                            <button onClick={handleEditSupplies}>저장</button>
                        </div>
                    </div>
                </div>
            )}
    
            <footer className={styles['footer-set']}>
                <div>create by OYR 1조</div>
                <div>email: OpenYearRound@naver.com</div> 
            </footer>
        </div>
    );
}

export default ExpenseCalculationAndSupplies;
