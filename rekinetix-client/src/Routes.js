import React from "react";
import { Route, Switch } from "react-router-dom";
import Attendance from "./Containers/Attendance/Attendance";
import HealingPlan from "./Containers/HealingPlan/HealingPlan";
import HealingPlanChart from "./components/HealingPlanChart/HealingPlanChart";
import {
  attendances,
  redFlags,
  patient,
  medic,
  diagnosis,
} from "./components/HealingPlanChart/healingPlanDataLatest";

const Routes = () => {
  return (
    <Switch>
      <Route path="/attendance" component={Attendance} />
      <Route path="/plan" component={HealingPlan} />
      <Route path="/plan-chart">
        <HealingPlanChart
          attendances={attendances}
          redFlags={redFlags}
          patient={patient}
          medic={medic}
          diagnosis={diagnosis}
        />
      </Route>
    </Switch>
  );
};

export default Routes;
