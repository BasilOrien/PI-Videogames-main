import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import { mainReducer } from "./reducer";
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(thunk))
);
