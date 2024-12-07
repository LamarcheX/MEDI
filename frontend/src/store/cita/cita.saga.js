import { takeLatest, call, put, all } from "redux-saga/effects";
import { CITAS_ACTION_TYPES } from "./cita.types";

import {
    createCitaSuccess,
    createCitaFailed,
    getCitasSuccess,
    getCitasFailed,
    getCitaByIdSuccess,
    getCitaByIdFailed,
    updateCitaSuccess,
    updateCitaFailed,
    deleteCitaSuccess,
    deleteCitaFailed,
} from "./cita.action";

import {
    getAllCitas,
    getCitaById,
    createCita,
    updateCita,
    deleteCita,
} from "../../utils/db/cita";

export function* getCitasStart() {
    try {
        const citas = yield call(getAllCitas);
        yield put(getCitasSuccess(citas));
    } catch (error) {
        yield put(getCitasFailed(error.message));
    }
};

export function* getCitaByIdStart({ payload: citaId }) {
    try {
        const cita = yield call(getCitaById, citaId);
        yield put(getCitaByIdSuccess(cita));
    } catch (error) {
        yield put(getCitaByIdFailed(error.message));
    }
};

export function* createCitaStart({ payload: cita }) {
    try {
        const newCita = yield call(createCita, cita);
        yield put(createCitaSuccess(newCita));
    } catch (error) {
        yield put(createCitaFailed(error.message));
    }
};

export function* updateCitaStart({ payload: cita }) {
    try {
        const updatedCita = yield call(updateCita, cita);
        yield put(updateCitaSuccess(updatedCita));
    } catch (error) {
        yield put(updateCitaFailed(error.message));
    }
};

export function* deleteCitaStart({ payload: citaId }) {
    try {
        yield call(deleteCita, citaId);
        yield put(deleteCitaSuccess(citaId));
    } catch (error) {
        yield put(deleteCitaFailed(error.message));
    }
};

export function* onGetCitasStart() {
    yield takeLatest(CITAS_ACTION_TYPES.GET_CITAS_START, getCitasStart);
};

export function* onGetCitaByIdStart() {
    yield takeLatest(CITAS_ACTION_TYPES.GET_CITA_BY_ID_START, getCitaByIdStart);
};

export function* onCreateCitaStart() {
    yield takeLatest(CITAS_ACTION_TYPES.CREATE_CITA_START, createCitaStart);
};

export function* onUpdateCitaStart() {
    yield takeLatest(CITAS_ACTION_TYPES.UPDATE_CITA_START, updateCitaStart);
};

export function* onDeleteCitaStart() {
    yield takeLatest(CITAS_ACTION_TYPES.DELETE_CITA_START, deleteCitaStart);
};

export function* citaSagas() {
    yield all([
        call(onGetCitasStart),
        call(onGetCitaByIdStart),
        call(onCreateCitaStart),
        call(onUpdateCitaStart),
        call(onDeleteCitaStart),
    ]);
};
