import React from 'react';
import './App.css';
// Route를 먼저 불러와줍니다.
import { Routes, Route, BrowserRouter } from "react-router-dom";

import EnterScheduleInformation from "./components/EnterScheduleInformation";
import ExpenseCalculationAndSupplies from "./components/ExpenseCalculationAndSupplies";
import PlannerWeather from "./components/PlannerWeather";
import Transport from "./components/Transport";
import ScheduleItem from "./components/ScheduleItem";
import Googlemap from "./components/Googlemap"
import SchedulePage from "./components/SchedulePage"
import Locationtest from './components/Locationtest';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }

  render(){

    return (
      <div>
          <Routes>
            {/* 웹 서비스 소개 페이지 */}
            <Route path="/main" element={<SchedulePage />} />
            {/* <SignIn /> */}
            <Route path="/cal" element={<ExpenseCalculationAndSupplies />} />
          </Routes>
      </div>

    );
  }
}

export default App;
