import { combineReducers } from "redux";
import bankReducer from "./bankReducer";


const reducers = combineReducers({
    bank: bankReducer
})

export type State = ReturnType<typeof reducers>
export default reducers;

