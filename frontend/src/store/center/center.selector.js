import { createSelector } from 'reselect';

export const selectCenterReducer = state => state.center;

export const selectCurrentCenter = createSelector(
    [selectCenterReducer],
    (center) => center.currentCenter
);

export const selectCenterErrorMessage = createSelector(
    [selectCenterReducer],
    center => center.errorMessage
);

export const selectIsCenterLoading = createSelector(
    [selectCenterReducer],
    (center) => center.isLoading
);
