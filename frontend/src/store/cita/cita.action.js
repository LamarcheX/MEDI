import { createAction } from "../../utils/reducer/reducer.utils";
import { CITA_ACTION_TYPES } from "./cita.types";

// Action creators
// Create cita action creators
export const createCitaStart = (cita) =>
    createAction(CITA_ACTION_TYPES.CREATE_CITA_START, cita);

export const createCitaSuccess = (cita) =>
    createAction(CITA_ACTION_TYPES.CREATE_CITA_SUCCESS, cita);

export const createCitaFailed = (errorMessage) =>
    createAction(CITA_ACTION_TYPES.CREATE_CITA_FAILED, errorMessage);

// Get cita action creators
export const getCitaStart = (payload) =>
    createAction(CITA_ACTION_TYPES.GET_CITA_START, payload);

export const getCitaSuccess = (data) =>
    createAction(CITA_ACTION_TYPES.GET_CITA_SUCCESS, data);

export const getCitaFailed = (errorMessage) =>
    createAction(CITA_ACTION_TYPES.GET_CITA_FAILED, errorMessage);

// Get citas action creators
export const getCitasStart = (payload) =>
    createAction(CITA_ACTION_TYPES.GET_CITAS_START, payload);

export const getCitasSuccess = (data) =>
    createAction(CITA_ACTION_TYPES.GET_CITAS_SUCCESS, data);

export const getCitasFailed = (errorMessage) =>
    createAction(CITA_ACTION_TYPES.GET_CITAS_FAILED, errorMessage);

// Get cita by id action creators
export const getCitaByIdStart = (citaId) =>
    createAction(CITA_ACTION_TYPES.GET_CITA_BY_ID_START, citaId);

export const getCitaByIdSuccess = (cita) =>
    createAction(CITA_ACTION_TYPES.GET_CITA_BY_ID_SUCCESS, cita);

export const getCitaByIdFailed = (errorMessage) =>
    createAction(CITA_ACTION_TYPES.GET_CITA_BY_ID_FAILED, errorMessage);

// Get cita by center id action creators
export const getCitaByCenterStart = (payload) =>
    createAction(CITA_ACTION_TYPES.GET_CITA_BY_CENTER_START, payload);

export const getCitaByCenterSuccess = (citas) =>
    createAction(CITA_ACTION_TYPES.GET_CITA_BY_CENTER_SUCCESS, citas);

export const getCitaByCenterFailed = (errorMessage) =>
    createAction(CITA_ACTION_TYPES.GET_CITA_BY_CENTER_FAILED, errorMessage);

// Update cita action creators
export const updateCitaStart = (cita) =>
    createAction(CITA_ACTION_TYPES.UPDATE_CITA_START, cita);

export const updateCitaSuccess = (cita) =>
    createAction(CITA_ACTION_TYPES.UPDATE_CITA_SUCCESS, cita);

export const updateCitaFailed = (errorMessage) =>
    createAction(CITA_ACTION_TYPES.UPDATE_CITA_FAILED, errorMessage);

// Delete cita action creators
export const deleteCitaStart = (citaId) =>
    createAction(CITA_ACTION_TYPES.DELETE_CITA_START, citaId);

export const deleteCitaSuccess = (citaId) =>
    createAction(CITA_ACTION_TYPES.DELETE_CITA_SUCCESS, citaId);

export const deleteCitaFailed = (errorMessage) =>
    createAction(CITA_ACTION_TYPES.DELETE_CITA_FAILED, errorMessage);
