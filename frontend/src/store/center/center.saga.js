import { takeLatest, call, put, all } from "redux-saga/effects";
import { CENTER_ACTION_TYPES } from "./center.types";
import Swal from "sweetalert2";

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
  checkCenterExists,
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
    console.log("Intentando login con las credenciales:", credentials);
    const centerAuth = yield call(loginCenter, credentials);

    console.log("Resultado de loginCenter:", centerAuth);

    if (centerAuth && centerAuth.token) {
      saveToken(centerAuth.token);
      yield put(loginCenterSuccess(centerAuth.center));
    } else {
      throw new Error("Autenticación fallida: Token no recibido.");
    }
  } catch (error) {
    console.error("Error al hacer login:", error);
    yield put(loginCenterFailed(error.message));
  }
}

export function* logoutCenterStart() {
  try {
    yield call(logoutCenter);
    yield call(deleteToken);
    yield put(logoutCenterSuccess());
    yield call(navigate, '/login');
  } catch (error) {
    yield put(logoutCenterFailed(error.message));
  }
}

export function* createCenterStart({ payload: { usuario, contraseña } }) {
    try {
      
      const centerExists = yield call(checkCenterExists, usuario);
      
      if (centerExists) {
        
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "El usuario ya está registrado.",
          confirmButtonText: "Aceptar",
        });
        return; 
      }
  
      
      yield call(createCenter, { usuario, contraseña });
      yield put(createCenterSuccess({ usuario, contraseña }));
  
      
      yield put({
        type: CENTER_ACTION_TYPES.LOGIN_CENTER_START,
        payload: { credentials: { usuario, contraseña } },
      });
  
      
      Swal.fire({
        icon: "success",
        title: "¡Registro Exitoso!",
        text: "El usuario se ha registrado correctamente.",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al crear el centro:", error);
      yield put(createCenterFailed(error.message));
  
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Ocurrió un error durante el registro.",
        confirmButtonText: "Aceptar",
      });
    }
  }

export function* onCheckCenterSessionStart() {
  yield takeLatest(
    CENTER_ACTION_TYPES.CHECK_CENTER_SESSION_START,
    checkCenterSession
  );
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
