import { ContentActionType } from "../action-types";
import { ContentAction } from "../actions";

import { TagsAction } from "../actions";
import { TagsActionType } from "../action-types";

const initialContent: Array<string> = [];

const tagsReducer = (tags: Array<string> = initialContent, action: TagsAction) => {
    switch (action.type) {
        case TagsActionType.SETTAGS:
            return action.value;
        default:
            return tags;
    }
}

export default tagsReducer;