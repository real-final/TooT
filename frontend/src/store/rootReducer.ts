import { combineReducers } from "redux";
import bubbleReducer from "./bubbleSlice";

const rootReducer = combineReducers({
    bubbles: bubbleReducer,
});

export default rootReducer;