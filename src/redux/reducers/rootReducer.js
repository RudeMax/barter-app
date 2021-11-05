import { combineReducers } from "redux";
import bartersReducer from "./bartersReducer.js";
import loginReducer from "./loginReducer.js";

const rootReducer = combineReducers({
  login: loginReducer,
  barters: bartersReducer,
});

export default rootReducer;
