import React from "react";
import { Route, Switch } from "react-router-dom";
import Attendance from "./Containers/Attendance/Attendance";
import HealingPlan from "./Containers/HealingPlan/HealingPlan";
import HealingPlanChart from "./components/HealingPlanChart/HealingPlanChart";
import { healingPlanByPatient } from "./components/HealingPlanChart/healingPlanData";

const Routes = () => {
  return (
    <Switch>
      <Route path="/attendance" component={Attendance} />
      <Route path="/plan" component={HealingPlan} />
      <Route path="/plan-chart">
        <HealingPlanChart healingPlan={healingPlanByPatient} />
      </Route>
    </Switch>
  );
};

export default Routes;
