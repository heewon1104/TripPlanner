import SchedulePage from "./components/SchedulePage";
import EnterScheduleInformation from "./components/EnterScheduleInformation";
import ExpenseCalculationAndSupplies from "./components/ExpenseCalculationAndSupplies";
import PlannerWeather from "./components/PlannerWeather";
import Transport from "./components/Transport";
import ScheduleItem from "./components/ScheduleItem";

function App() {
  return (
    <div className='App'>
      {/* <SchedulePage></SchedulePage> */}
      {/*<EnterScheduleInformation></EnterScheduleInformation>*/}
      {/*<ExpenseCalculationAndSupplies></ExpenseCalculationAndSupplies>*/}
      {/*<PlannerWeather></PlannerWeather>*/}
      {/* <Transport></Transport> */}

      <ScheduleItem></ScheduleItem>
      
      {/* 주석설정 shift + option + a */}
    </div>
  );
}

export default App;
