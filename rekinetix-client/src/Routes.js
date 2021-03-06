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

const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/login" />;

const Routes = ({ user }) => {
  return (
    <Switch>
      <ProtectedRoute path="/" exact component={Patients}
                      isAllowed={user && user.role}
      />
  
      <ProtectedRoute path="/patients" exact component={Patients}
                      isAllowed={user && user.role}
      />
  
      <ProtectedRoute path="/patients/new" exact component={PatientRecord}
                      isAllowed={user && user.role}
      />
      <ProtectedRoute path="/patients/primary-assessments/new" exact component={PrimaryAssessment}
                      isAllowed={user && user.role}
      />
  
      <ProtectedRoute path="/patients/healing-plans/new" exact component={HealingPlan}
                      isAllowed={user && user.role}
      />
  
      <ProtectedRoute path="/patients/primary-assessments/new" exact component={PrimaryAssessment}
                      isAllowed={user && user.role}
      />
  
      <ProtectedRoute path="/patients/healing-plans/:planId" exact component={HealingPlanChart}
                      isAllowed={user && user.role}
      />
  
      <ProtectedRoute path="/patients/attendances/new" exact component={Attendance}
                      isAllowed={user && user.role}
      />


      <Route path="/login" exact component={Login} />
      <ProtectedRoute
        path="/register"
        component={Register}
        isAllowed={user && user.role && user.role === "admin"}
      />

      <Route path="/siteMap" component={SiteMap} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  user: state.users.user,
});

export default connect(mapStateToProps)(Routes);
