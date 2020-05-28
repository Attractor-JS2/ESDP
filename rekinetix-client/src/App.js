import React from "react";
import {NotificationContainer} from "react-notifications";

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
