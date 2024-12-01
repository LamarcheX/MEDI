import { createSelector } from 'reselect';

export const selectHistoryReducer = state => state.history;

export const selectHistory = createSelector(
    [selectHistoryReducer],
    (history) => history.history
);

export const selectHistoryErrorMessage = createSelector(
    [selectHistoryReducer],
    history => history.errorMessage
);

export const selectIsHistoryLoading = createSelector(
    [selectHistoryReducer],
    (history) => history.isLoading
);

export const selectCurrentPage = createSelector(
    [selectHistoryReducer],
    (history) => history.currentPage
);

export const selectTotalPages = createSelector(
    [selectHistoryReducer],
    (history) => history.totalPages
);

export const selectTotalResults = createSelector(
    [selectHistoryReducer],
    (history) => history.totalResults
);
