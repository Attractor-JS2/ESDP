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
import PrimaryAssessment from "./Containers/PrimaryAssessment/PrimaryAssessment";
import Login from "./Containers/Login/Login";
import Register from "./Containers/Register/Register";
import SiteMap from "./Containers/SiteMap/SiteMap";

const Routes = () => {
  return (
    <Switch>
      <Route path="/primary-assessment" component={PrimaryAssessment} />
      <Route path="/patients" component={Patient} />
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

      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />

      <Route path="/siteMap" component={SiteMap} />
    </Switch>
  );
};

export default Routes;
