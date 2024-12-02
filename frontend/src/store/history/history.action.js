import { createAction } from "../../utils/reducer/reducer.utils";
import { HISTORY_ACTION_TYPES } from "./history.types";

// Action creators
// Create history action creators
export const createHistoryStart = (history) =>
    createAction(HISTORY_ACTION_TYPES.CREATE_HISTORY_START, history);

export const createHistorySuccess = (history) =>
    createAction(HISTORY_ACTION_TYPES.CREATE_HISTORY_SUCCESS, history);

export const createHistoryFailed = (errorMessage) =>
    createAction(HISTORY_ACTION_TYPES.CREATE_HISTORY_FAILED, errorMessage);

// Get history action creators
export const getHistoryStart = (page) =>
    createAction(HISTORY_ACTION_TYPES.GET_HISTORY_START, page);

export const getHistorySuccess = (history) =>
    createAction(HISTORY_ACTION_TYPES.GET_HISTORY_SUCCESS, history);

export const getHistoryFailed = (errorMessage) =>
    createAction(HISTORY_ACTION_TYPES.GET_HISTORY_FAILED, errorMessage);

// Update history action creators
export const updateHistoryStart = (history) =>
    createAction(HISTORY_ACTION_TYPES.UPDATE_HISTORY_START, history);

export const updateHistorySuccess = (history) =>
    createAction(HISTORY_ACTION_TYPES.UPDATE_HISTORY_SUCCESS, history);

export const updateHistoryFailed = (errorMessage) =>
    createAction(HISTORY_ACTION_TYPES.UPDATE_HISTORY_FAILED, errorMessage);

// Delete history action creators
export const deleteHistoryStart = (id) =>
    createAction(HISTORY_ACTION_TYPES.DELETE_HISTORY_START, id);

export const deleteHistorySuccess = (id) =>
    createAction(HISTORY_ACTION_TYPES.DELETE_HISTORY_SUCCESS, id);

export const deleteHistoryFailed = (errorMessage) =>
    createAction(HISTORY_ACTION_TYPES.DELETE_HISTORY_FAILED, errorMessage);
