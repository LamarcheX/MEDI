import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.saga';
import { historySagas } from './history/history.saga';
import { centerSagas } from './center/center.saga';

export function* rootSaga() {
    yield all([
        call(userSagas),
        call(centerSagas),
        call(historySagas),
    ]);
}
