import { combineReducers } from "redux";
import bubbleReducer from "../slices/bubbleSlice";
import stockReducer from "../slices/stockSlice";

const rootReducer = combineReducers({
    bubbles: bubbleReducer,
    stock: stockReducer,
});

export default rootReducer;