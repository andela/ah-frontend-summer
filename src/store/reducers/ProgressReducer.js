import {ENDED, STARTED, SUCCEEDED} from "../actions/async";

const action_to_progress_mapping = {
    BOOKMARK: "bookmark",
    UNDO_BOOKMARK: "bookmark",
};

export const defaultState = {
    bookmark: {
        loading: false,
        status: SUCCEEDED
    }
};

const progressReducer = (state=defaultState, action) => {
    if (!action) return state;

    const newState = JSON.parse(JSON.stringify(state)); // clone state
    const {type} = action;
    const indexOfLastUnderscore = type.lastIndexOf('_');
    if (indexOfLastUnderscore === -1) return newState; // return the state if action is not supported
    const actionName = type.substr(0, indexOfLastUnderscore);
    const actionType = type.substr(indexOfLastUnderscore); // includes leading underscore
    const loadingState = newState[action_to_progress_mapping[actionName]]; // if this state is not handled yet, ignore it
    if (!loadingState) return state ;
    loadingState.status = actionType === ENDED ? loadingState.status : actionType;

    switch (actionType) {
    case STARTED: loadingState.loading = true; break;
    case ENDED: loadingState.loading = false; break;
    }

    return newState;
};

export default progressReducer;
