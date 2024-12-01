import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import centerReducer from './center/center.reducer';
import historyReducer from './history/history.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    center: centerReducer,
    history: historyReducer,
});
