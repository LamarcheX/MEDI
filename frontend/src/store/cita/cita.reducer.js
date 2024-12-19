import { CITA_ACTION_TYPES } from "./cita.types";

const INITIAL_STATE = {
    cita: null,
    citas: [],
    errorMessage: null,
    isLoading: false,
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    hasNextPage: false,
    hasPrevPage: false,
};

const citaReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    const { data, pagination } = payload || {};

    switch (type) {
        case CITA_ACTION_TYPES.GET_CITA_START:
        case CITA_ACTION_TYPES.GET_CITAS_START:
        case CITA_ACTION_TYPES.GET_CITA_BY_ID_START:
        case CITA_ACTION_TYPES.UPDATE_CITA_START:
        case CITA_ACTION_TYPES.DELETE_CITA_START:
            return { ...state, isLoading: true, errorMessage: null, citas: [] };
        case CITA_ACTION_TYPES.CREATE_CITA_START:
            return { ...state, isLoading: true, errorMessage: null };
        case CITA_ACTION_TYPES.CREATE_CITA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                citas: [...state.citas, payload],
            };
        case CITA_ACTION_TYPES.GET_CITAS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                citas: data,
                currentPage: pagination.currentPage,
                totalPages: pagination.totalPages,
                totalResults: pagination.totalDocuments,
                hasNextPage: pagination.hasNextPage,
                hasPrevPage: pagination.hasPrevPage,
            };
        case CITA_ACTION_TYPES.GET_CITA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                cita: payload,
            };
        case CITA_ACTION_TYPES.GET_CITA_BY_CENTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                citas: data,
                currentPage: pagination.currentPage,
                totalPages: pagination.totalPages,
                totalResults: pagination.totalDocuments,
                hasNextPage: pagination.hasNextPage,
                hasPrevPage: pagination.hasPrevPage,
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
        case CITA_ACTION_TYPES.GET_CITAS_FAILED:
        case CITA_ACTION_TYPES.GET_CITA_BY_CENTER_FAILED:
        case CITA_ACTION_TYPES.GET_CITA_BY_ID_FAILED:
        case CITA_ACTION_TYPES.UPDATE_CITA_FAILED:
        case CITA_ACTION_TYPES.DELETE_CITA_FAILED:
            return { ...state, isLoading: false, errorMessage: payload };
        default:
            return state;
    }
};

export default citaReducer;
