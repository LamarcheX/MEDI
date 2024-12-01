import { CENTER_ACTION_TYPES } from "./center.types";

const INITIAL_STATE = {
    currentCenter: null,
    errorMessage: null,
    isLoading: false,
};

const centerReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CENTER_ACTION_TYPES.LOGIN_CENTER_START:
        case CENTER_ACTION_TYPES.CREATE_CENTER_START:
        case CENTER_ACTION_TYPES.LOGOUT_CENTER_START:
        case CENTER_ACTION_TYPES.CHECK_CENTER_SESSION_START:
        case CENTER_ACTION_TYPES.UPDATE_CENTER_START:
            return { ...state, errorMessage: null, isLoading: true };
        case CENTER_ACTION_TYPES.LOGIN_CENTER_SUCCESS:
        case CENTER_ACTION_TYPES.CHECK_CENTER_SESSION_SUCCESS:
        case CENTER_ACTION_TYPES.UPDATE_CENTER_SUCCESS:
            return { ...state, errorMessage: null, currentCenter: payload, isLoading: false };
        case CENTER_ACTION_TYPES.LOGOUT_CENTER_SUCCESS:
            return { ...state, errorMessage: null, currentCenter: null, isLoading: false };
        case CENTER_ACTION_TYPES.LOGIN_CENTER_FAILED:
        case CENTER_ACTION_TYPES.CREATE_CENTER_FAILED:
            return { ...state, errorMessage: payload, currentCenter: null, isLoading: false };
        case CENTER_ACTION_TYPES.CHECK_CENTER_SESSION_FAILED:
        case CENTER_ACTION_TYPES.UPDATE_CENTER_FAILED:
        case CENTER_ACTION_TYPES.LOGOUT_CENTER_FAILED:
            return { ...state, errorMessage: payload, isLoading: false };
        default:
            return state;
    }
};

export default centerReducer;
