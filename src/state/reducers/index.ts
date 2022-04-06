import { combineReducers } from "redux";
import bankReducer from "./bankReducer";
import contentReducer from "./contentReducer";


const reducers = combineReducers({
    bank: bankReducer,
    content: contentReducer
})

export type State = ReturnType<typeof reducers>
export default reducers;

