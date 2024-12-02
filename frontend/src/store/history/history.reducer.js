import { HISTORY_ACTION_TYPES } from "./history.types";

const INITIAL_STATE = {
    history: [],
    errorMessage: null,
    isLoading: false,
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
};

const historyReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case HISTORY_ACTION_TYPES.CREATE_HISTORY_START:
        case HISTORY_ACTION_TYPES.GET_HISTORY_START:
        case HISTORY_ACTION_TYPES.UPDATE_HISTORY_START:
        case HISTORY_ACTION_TYPES.DELETE_HISTORY_START:
            return { ...state, errorMessage: null, isLoading: true };
        case HISTORY_ACTION_TYPES.CREATE_HISTORY_SUCCESS:
            return {
                ...state,
                errorMessage: null,
                isLoading: false,
                history: [payload, ...state.history],
            };
        case HISTORY_ACTION_TYPES.GET_HISTORY_SUCCESS:
            return {
                ...state,
                errorMessage: null,
                isLoading: false,
                history: payload.data,
                currentPage: payload.currentPage,
                totalPages: payload.totalPages,
                totalResults: payload.totalResults,
            };
        case HISTORY_ACTION_TYPES.UPDATE_HISTORY_SUCCESS:
            return {
                ...state,
                errorMessage: null,
                isLoading: false,
                history: state.history.map((item) =>
                    item._id === payload._id ? payload : item
                ),
            };
        case HISTORY_ACTION_TYPES.DELETE_HISTORY_SUCCESS:
            return {
                ...state,
                errorMessage: null,
                isLoading: false,
                history: state.history.filter((item) => item._id !== payload),
            };
        case HISTORY_ACTION_TYPES.CREATE_HISTORY_FAILED:
        case HISTORY_ACTION_TYPES.GET_HISTORY_FAILED:
        case HISTORY_ACTION_TYPES.UPDATE_HISTORY_FAILED:
        case HISTORY_ACTION_TYPES.DELETE_HISTORY_FAILED:
            return { ...state, errorMessage: payload, isLoading: false };
        default:
            return state;
    }
};

export default historyReducer;
