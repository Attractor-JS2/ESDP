import React from "react";
import "./App.css";
import Routes from "./Routes";
import {Link} from "react-router-dom";
import {Row} from "reactstrap";


function App() {
  return(
  <>
    <Row className='w-100 mb-3 border-bottom border-dark row justify-content-center'>
      <Link className='mx-5' to='/attendance'>Прием</Link>
      <Link to='/plan-chart'>План лечения</Link>
    </Row>
    
    <Routes/>;
  </>)
}

export default App;
