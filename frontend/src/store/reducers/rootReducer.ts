import { combineReducers } from "redux";
import bubbleReducer from "../slices/bubbleSlice";

const rootReducer = combineReducers({
    bubbles: bubbleReducer,
});

export default rootReducer;