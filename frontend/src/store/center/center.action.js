import { createAction } from "../../utils/reducer/reducer.utils";
import { CENTER_ACTION_TYPES } from "./center.types";

// Action creators
// Set current center action creator
export const setCurrentCenter = (center) =>
    createAction(CENTER_ACTION_TYPES.SET_CURRENT_CENTER, center);

export const checkCenterSessionStart = () =>
    createAction(CENTER_ACTION_TYPES.CHECK_CENTER_SESSION_START);

export const checkCenterSessionSuccess = (center) =>
    createAction(CENTER_ACTION_TYPES.CHECK_CENTER_SESSION_SUCCESS, center);

export const checkCenterSessionFailed = (errorMessage) =>
    createAction(CENTER_ACTION_TYPES.CHECK_CENTER_SESSION_FAILED, errorMessage);

// Login center action creators
export const loginCenterStart = (credentials) =>
    createAction(CENTER_ACTION_TYPES.LOGIN_CENTER_START, credentials);

export const loginCenterSuccess = (center) =>
    createAction(CENTER_ACTION_TYPES.LOGIN_CENTER_SUCCESS, center);

export const loginCenterFailed = (errorMessage) =>
    createAction(CENTER_ACTION_TYPES.LOGIN_CENTER_FAILED, errorMessage);

// Logout center action creators
export const logoutCenterStart = () =>
    createAction(CENTER_ACTION_TYPES.LOGOUT_CENTER_START);

export const logoutCenterSuccess = () =>
    createAction(CENTER_ACTION_TYPES.LOGOUT_CENTER_SUCCESS);

export const logoutCenterFailed = (errorMessage) =>
    createAction(CENTER_ACTION_TYPES.LOGOUT_CENTER_FAILED, errorMessage);

// Create center action creators
export const createCenterStart = (center) =>
    createAction(CENTER_ACTION_TYPES.CREATE_CENTER_START, center);

export const createCenterSuccess = (center) =>
    createAction(CENTER_ACTION_TYPES.CREATE_CENTER_SUCCESS, center);

export const createCenterFailed = (errorMessage) =>
    createAction(CENTER_ACTION_TYPES.CREATE_CENTER_FAILED, errorMessage);

// Update center action creators
export const updateCenterStart = (center) =>
    createAction(CENTER_ACTION_TYPES.UPDATE_CENTER_START, center);

export const updateCenterSuccess = (center) =>
    createAction(CENTER_ACTION_TYPES.UPDATE_CENTER_SUCCESS, center);

export const updateCenterFailed = (errorMessage) =>
    createAction(CENTER_ACTION_TYPES.UPDATE_CENTER_FAILED, errorMessage);

