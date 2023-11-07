import React from 'react';
import './App.css';
// Route를 먼저 불러와줍니다.
import { Routes, Route, BrowserRouter } from "react-router-dom";

import EnterScheduleInformation from "./components/EnterScheduleInformation";
import ExpenseCalculationAndSupplies from "./components/ExpenseCalculationAndSupplies";
import PlannerWeather from "./components/PlannerWeather";
import ScheduleItem from "./components/ScheduleItem";
import SchedulePage from "./components/SchedulePage"

import LoginPage from "./login";
import MainPage from "./main";
import Community from "./community";

function App(){
    return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/community" element={<Community />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/expense" element={<ExpenseCalculationAndSupplies />} />
          </Routes>
      </BrowserRouter>

    );
}

export default App;
