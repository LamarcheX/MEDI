import { createSelector } from 'reselect';

export const selectCitaReducer = state => state.cita;

export const selectCitas = createSelector(
    [selectCitaReducer],
    (cita) => cita.citas
);

export const selectCita = createSelector(
    [selectCitaReducer],
    (cita) => cita.cita
);

export const selectCitaErrorMessage = createSelector(
    [selectCitaReducer],
    (cita) => cita.errorMessage
);

export const selectIsCitaLoading = createSelector(
    [selectCitaReducer],
    (cita) => cita.isLoading
);

export const selectCurrentPage = createSelector(
    [selectCitaReducer],
    (cita) => cita.currentPage
);

export const selectTotalPages = createSelector(
    [selectCitaReducer],
    (cita) => cita.totalPages
);

export const selectTotalResults = createSelector(
    [selectCitaReducer],
    (cita) => cita.totalResults
);
