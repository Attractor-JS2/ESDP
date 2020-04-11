import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Attendance from "./Containers/Attendance/Attendance";
import HealingPlan from "./Containers/HealingPlan/HealingPlan";

import { healingPlanByPatient } from './components/HealingPlanChart/healingPlanData';
import HealingPlanChart from './components/HealingPlanChart/HealingPlanChart';

function App() {
  return (
        <Switch>
          <Route path='/attendance' component={Attendance}/>
          <Route path='/plan' component={HealingPlan} />
          <Route path="/react-table">
            <HealingPlanChart healingPlan={healingPlanByPatient} />
          </Route>
        </Switch>
  );
}

export default App;
