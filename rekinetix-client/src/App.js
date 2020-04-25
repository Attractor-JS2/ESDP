import React from "react";
import {NotificationContainer} from "react-notifications";

import "./App.css";
import Routes from "./Routes";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <NotificationContainer />
      <Routes />
    </>
  );
}

export default App;
