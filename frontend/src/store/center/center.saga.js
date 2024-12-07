import { takeLatest, call, put, all } from "redux-saga/effects";
import { CENTER_ACTION_TYPES } from "./center.types";

import {
    checkCenterSessionSuccess,
    checkCenterSessionFailed,
    loginCenterSuccess,
    loginCenterFailed,
    logoutCenterSuccess,
    logoutCenterFailed,
    createCenterSuccess,
    createCenterFailed,
} from "./center.action";

import {
    getCurrentCenter,
    createCenter,
    loginCenter,
    logoutCenter,
} from "../../utils/db/center";
import { deleteToken, saveToken } from "../../utils/api/secureToken";

export function* checkCenterSession() {
    try {
        const centerAuth = yield call(getCurrentCenter);

        if (centerAuth) {
            yield put(checkCenterSessionSuccess(centerAuth));
        } else {
            yield call(deleteToken);
            yield put(checkCenterSessionFailed("No center session found"));
        }
    } catch (error) {
        yield put(checkCenterSessionFailed(error.message));
    }
}

export function* loginCenterStart({ payload: credentials }) {
    try {
        const centerAuth = yield call(loginCenter, credentials);
        saveToken(centerAuth.token);
        yield put(loginCenterSuccess(centerAuth.center));
    } catch (error) {
        yield put(loginCenterFailed(error.message));
    }
}

export function* logoutCenterStart() {
    try {
        yield call(logoutCenter);
        yield call(deleteToken);
        yield put(logoutCenterSuccess());
    } catch (error) {
        yield put(logoutCenterFailed(error.message));
    }
}

export function* createCenterStart({ payload: { usuario, contraseña, nombre, role } }) {
    try {
        yield call(createCenter, { usuario, contraseña, nombre, role });
        yield put(createCenterSuccess({ usuario, contraseña, nombre, role }));
        // Iniciar sesión después de registrarse
        yield put(loginCenterStart({ usuario, contraseña }));        
    } catch (error) {
        yield put(createCenterFailed(error.message));
    }
}

export function* onCheckCenterSessionStart() {
    yield takeLatest(CENTER_ACTION_TYPES.CHECK_CENTER_SESSION_START, checkCenterSession);
}

export function* onLoginCenterStart() {
    yield takeLatest(CENTER_ACTION_TYPES.LOGIN_CENTER_START, loginCenterStart);
}

export function* onLogoutCenterStart() {
    yield takeLatest(CENTER_ACTION_TYPES.LOGOUT_CENTER_START, logoutCenterStart);
}

export function* onCreateCenterStart() {
    yield takeLatest(CENTER_ACTION_TYPES.CREATE_CENTER_START, createCenterStart);
}

export function* centerSagas() {
    yield all([
        call(onCheckCenterSessionStart),
        call(onLoginCenterStart),
        call(onLogoutCenterStart),
        call(onCreateCenterStart),
    ]);
}