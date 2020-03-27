import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Attendance from "./Containers/Attendance/Attendance";
import CourseForm from "./Containers/Course/CourseForm";

function App() {
  return (
        <Switch>
          <Route path='/attendance' component={Attendance}/>
          <Route path='/course' component={CourseForm} />
        </Switch>
    
  );
}

export default App;
