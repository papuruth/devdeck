import HeaderReducer from "components/Header/HeaderReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    headerReducer: HeaderReducer
});

export default rootReducer;
