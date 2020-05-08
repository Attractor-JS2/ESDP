import React from "react";
import { Route, Switch } from "react-router-dom";
import Attendance from "./Containers/Attendance/Attendance";
import HealingPlan from "./Containers/HealingPlan/HealingPlan";
import HealingPlanChart from "./components/HealingPlanChart/HealingPlanChart";
import {
  redFlags,
  patient,
  medic,
  diagnosis,
} from "./components/HealingPlanChart/healingPlanDataLatest";
import Patient from "./Containers/Patient/Patient";
import PatientCardCreatingForm from "./Containers/PatientCardCreatingForm/PatientCardCreatingForm";
import PrimaryAttendance from "./Containers/PrimaryAttendance/PrimaryAttendance";

const Routes = () => {
  return (
    <Switch>
      <Route path="/primary-attendance" component={PrimaryAttendance} />
      <Route path="/patient" component={Patient} />
      <Route path="/attendance" component={Attendance} />
      <Route path="/plan" component={HealingPlan} />
      <Route path="/createPatient" component={PatientCardCreatingForm} />
      <Route path="/plan-chart">
        <HealingPlanChart
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
