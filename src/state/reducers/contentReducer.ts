import { ContentActionType } from "../action-types";
import { ContentAction } from "../actions";


const initialContent = "proportion";

const contentReducer = (state: string = initialContent, action: ContentAction) => {
    switch (action.type) {
        case ContentActionType.CHANGECONTENT:
            return action.content;
        default:
            return state;
    }
}

export default contentReducer;