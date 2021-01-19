import { combineReducers } from "redux";
import dealsReducer from "./dealsReducer"

export default combineReducers({
    deals: dealsReducer,
});
