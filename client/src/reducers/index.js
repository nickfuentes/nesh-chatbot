import { combineReducers } from "redux";
import queryReducer from "./queryReducer";

export default combineReducers({
  query: queryReducer
});
