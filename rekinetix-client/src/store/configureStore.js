import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import healingPlanReducer from "./reducers/healingPlan";
import attendance from "./reducers/attendance";
import patientCardsReducer from "./reducers/patientCards";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  healingPlan: healingPlanReducer,
  attendance: attendance,
  patientCards: patientCardsReducer,
  router: connectRouter(history),
});

const middleware = [thunkMiddleware, routerMiddleware(history)];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

export const store = createStore(rootReducer, enhancers);
