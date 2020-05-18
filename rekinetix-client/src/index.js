import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import 'typeface-roboto';
import "./index.css";
import 'react-notifications/lib/notifications.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { store, history } from "./store/configureStore";
import axios from './axiosBackendInstance';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

axios.interceptors.request.use((config) => {
  try {
    const { user } = store.getState().users;
    config.headers['x-access-token'] = user && user.token;
  } catch (error) {
    throw new Error(error);
  }
  return config;
});

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
