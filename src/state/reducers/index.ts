import { combineReducers } from "redux";
import bankReducer from "./bankReducer";
import contentReducer from "./contentReducer";
import tagsReducer from "./tagsReducer";


const reducers = combineReducers({
    bank: bankReducer,
    content: contentReducer,
    finallyTags: tagsReducer 
})

export type State = ReturnType<typeof reducers>
export default reducers;

