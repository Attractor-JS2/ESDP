import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Attendance from "./Containers/Attendance/Attendance";
import HealingPlan from "./Containers/HealingPlan/HealingPlan";
import HealingPlanChart from "./Containers/HealingPlanChart/HealingPlanChart";
import Patients from "./Containers/Patients/Patients";
import PrimaryAssessment from "./Containers/PrimaryAssessment/PrimaryAssessment";
import Login from "./Containers/Login/Login";
import Register from "./Containers/Register/Register";
import PatientRecord from "./Containers/PatientRecord/PatientRecord";

import SiteMap from "./Containers/SiteMap/SiteMap";

const ProtectedRoute = ({ isAllowed, ...props }) => (
  isAllowed ? <Route {...props} /> : <Redirect to="/" />
);

const Routes = ({ user }) => {
  return (
    <Switch>
      <Route path="/patients" exact component={Patients} />
      <Route path="/patients/register" component={PatientRecord} />

      <Route path="/patients/primary-assessments/new" component={PrimaryAssessment} />

      <Route path="/patients/healing-plans/new" exact component={HealingPlan} />
      <Route path="/patients/healing-plans" exact component={HealingPlanChart} />
      <Route path="/patients/healing-plans/:planId" component={HealingPlanChart} />

      <Route path="/patients/attendances/new" component={Attendance} />

      <Route path="/" exact component={Login} />
      <ProtectedRoute
        path="/register"
        component={Register}
        isAllowed={user && user.role === "admin"}
      />

      <Route path="/siteMap" component={SiteMap} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  user: state.users.user,
});

export default connect(mapStateToProps)(Routes);
