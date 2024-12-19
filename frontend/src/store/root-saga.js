import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.saga';
import { historySagas } from './history/history.saga';
import { centerSagas } from './center/center.saga';
import { citaSagas } from './cita/cita.saga';

export function* rootSaga() {
    yield all([
        call(userSagas),
        call(centerSagas),
        call(citaSagas),
        call(historySagas),
    ]);
}
