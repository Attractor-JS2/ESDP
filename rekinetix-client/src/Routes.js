import React from "react";
import { Route, Switch } from "react-router-dom";
import Attendance from "./Containers/Attendance/Attendance";
import HealingPlan from "./Containers/HealingPlan/HealingPlan";

const Routes = () => {
  return (
    <Switch>
      <Route path="/attendance" component={Attendance} />
      <Route path="/plan" component={HealingPlan} />
    </Switch>
  );
};

export default Routes;