import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { loadStateFromLocalStorage, saveStateToLocalStorage } from "./localStorage";
import healingPlanReducer from "./reducers/healingPlan";
import attendance from "./reducers/attendance";
import patientCardsReducer from "./reducers/patientCards";
import usersReducer from "./reducers/users";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  healingPlan: healingPlanReducer,
  attendance: attendance,
  patientCards: patientCardsReducer,
  users: usersReducer,
  router: connectRouter(history),
});

const middleware = [thunkMiddleware, routerMiddleware(history)];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadStateFromLocalStorage();

export const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
  saveStateToLocalStorage({
    users: {
      user: store.getState().users.user,
    },
  });
});
