import { CITA_ACTION_TYPES } from "./cita.types";

const INITIAL_STATE = {
    citas: [],
    cita: null,
    errorMessage: null,
    isLoading: false,
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
};

const citaReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CITA_ACTION_TYPES.CREATE_CITA_START:
        case CITA_ACTION_TYPES.GET_CITA_START:
        case CITA_ACTION_TYPES.GET_CITA_BY_ID_START:
        case CITA_ACTION_TYPES.UPDATE_CITA_START:
        case CITA_ACTION_TYPES.DELETE_CITA_START:
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            };
        case CITA_ACTION_TYPES.CREATE_CITA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                citas: [...state.citas, payload],
            };
        case CITA_ACTION_TYPES.GET_CITA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                citas: payload.data,
                currentPage: payload.currentPage,
                totalPages: payload.totalPages,
                totalResults: payload.totalResults,
            };
        case CITA_ACTION_TYPES.GET_CITA_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                cita: payload,
            };
        case CITA_ACTION_TYPES.UPDATE_CITA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                citas: state.citas.map((cita) =>
                    cita._id === payload._id ? payload : cita
                ),
            };
        case CITA_ACTION_TYPES.DELETE_CITA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                citas: state.citas.filter((cita) => cita._id !== payload),
            };
        case CITA_ACTION_TYPES.CREATE_CITA_FAILED:
        case CITA_ACTION_TYPES.GET_CITA_FAILED:
        case CITA_ACTION_TYPES.GET_CITA_BY_ID_FAILED:
        case CITA_ACTION_TYPES.UPDATE_CITA_FAILED:
        case CITA_ACTION_TYPES.DELETE_CITA_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload,
            };
        default:
            return state;
    }
};

export default citaReducer;
