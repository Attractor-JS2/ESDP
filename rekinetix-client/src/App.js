import React from "react";
import {NotificationContainer} from "react-notifications";

import Routes from "./Routes";
import Header from "./components/Header/Header";
import MuiBreadcrumbs from "./components/Navigation/MuiBreadcrumbs";

function App() {
  return (
    <>
      <Header />
      <NotificationContainer />
      <MuiBreadcrumbs />
      <Routes />
    </>
  );
}

export default App;
