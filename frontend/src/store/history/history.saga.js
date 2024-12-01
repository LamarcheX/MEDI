import { takeLatest, put, call, all } from 'redux-saga/effects';
import { HISTORY_ACTION_TYPES } from './history.types';

import {
    createHistorySuccess,
    createHistoryFailed,
    getHistorySuccess,
    getHistoryFailed,
    updateHistorySuccess,
    updateHistoryFailed,
    deleteHistorySuccess,
    deleteHistoryFailed,
} from './history.action.js';

import {
    createHistorial,
    getHistorial,
    getHistorialById,
    getHistorialByCenter,
    updateHistorial,
    deleteHistorial,
} from '../../utils/db/history.js';

export function* createHistory({ payload: history }) {
    try {
        const newHistory = yield call(createHistorial, history);
        yield put(createHistorySuccess(newHistory));
    } catch (error) {
        yield put(createHistoryFailed(error.message));
    }
}

export function* getHistory() {
    try {
        const history = yield call(getHistorial);
        yield put(getHistorySuccess(history));
    } catch (error) {
        yield put(getHistoryFailed(error.message));
    }
}

export function* getHistoryById({ payload: id }) {
    try {
        const history = yield call(getHistorialById, id);
        yield put(getHistorySuccess(history));
    } catch (error) {
        yield put(getHistoryFailed(error.message));
    }
}

export function* getHistoryByCenter({ payload: centerId }) {
    try {
        const history = yield call(getHistorialByCenter, centerId);
        yield put(getHistorySuccess(history));
    } catch (error) {
        yield put(getHistoryFailed(error.message));
    }
}

export function* updateHistory({ payload: history }) {
    try {
        const updatedHistory = yield call(updateHistorial, history);
        yield put(updateHistorySuccess(updatedHistory));
    } catch (error) {
        yield put(updateHistoryFailed(error.message));
    }
}

export function* deleteHistory({ payload: id }) {
    try {
        yield call(deleteHistorial, id);
        yield put(deleteHistorySuccess(id));
    } catch (error) {
        yield put(deleteHistoryFailed(error.message));
    }
}

export function* onCreateHistoryStart() {
    yield takeLatest(HISTORY_ACTION_TYPES.CREATE_HISTORY_START, createHistory);
}

export function* onGetHistoryStart() {
    yield takeLatest(HISTORY_ACTION_TYPES.GET_HISTORY_START, getHistory);
}

export function* onGetHistoryByIdStart() {
    yield takeLatest(HISTORY_ACTION_TYPES.GET_HISTORY_BY_ID_START, getHistoryById);
}

export function* onUpdateHistoryStart() {
    yield takeLatest(HISTORY_ACTION_TYPES.UPDATE_HISTORY_START, updateHistory);
}

export function* onDeleteHistoryStart() {
    yield takeLatest(HISTORY_ACTION_TYPES.DELETE_HISTORY_START, deleteHistory);
}

export function* historySagas() {
    yield all([
        call(onCreateHistoryStart),
        call(onGetHistoryStart),
        call(onGetHistoryByIdStart),
        call(onUpdateHistoryStart),
        call(onDeleteHistoryStart),
    ]);
}
