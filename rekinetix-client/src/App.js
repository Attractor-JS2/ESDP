import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Attendance from "./Containers/Attendance/Attendance";
import HealingPlan from "./Containers/HealingPlan/HealingPlan";
import ChartGantt from './components/ChartGantt/ChartGantt';

import { healingPlanByPatient } from './components/ChartGantt/planData';
import ChartTable from './components/ChartTable/ChartTable';

function App() {
  return (
        <Switch>
          <Route path='/attendance' component={Attendance}/>
          <Route path='/plan' component={HealingPlan} />
          <Route path='/chart'>
            <ChartGantt healingPlan={healingPlanByPatient} />
          </Route>
          <Route path="/table">
            <ChartTable healingPlan={healingPlanByPatient} />
          </Route>
        </Switch>
  );
}

export default App;
