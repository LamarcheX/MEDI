import api from '../api/api';

export const getAllCitas = async (payload) => {
    const { /* idCentro, */ queries = {page: 1} } = payload;
    try {
        const response = await api.get('/api/citas', { params: queries });
        return response.data;
    } catch (error) {
        console.error('Error fetching all citas:', error.response?.data || error.message);
        throw new Error('Error while fetching all citas', error);
    }
};

export const getCitaById = async (citaId) => {
    try {
        const response = await api.get(`/api/citas/${citaId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error while fetching the cita', error);
    }
};

export const getCitaByCenter = async (centerId) => {
    try {
        const response = await api.get(`/api/citas/centro/${centerId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error while fetching the cita', error);
    }
};

export const createCita = async (cita) => {
    try {
        const response = await api.post('/api/cita/crear', cita);
        return response.data;
    } catch (error) {
        throw new Error('Error while creating the cita', error);
    }
};

export const updateCita = async (cita) => {
    console.log("Cita to update:", cita);
    try {
        const response = await api.put(`/api/cita/actualizar`, cita);
        return response.data;
    } catch (error) {
        throw new Error('Error while updating the cita', error);
    }
};

export const deleteCita = async (_id) => {
    try {
        const response = await api.delete(`/api/citas/eliminar`, _id);
        return response.data;
    } catch (error) {
        throw new Error('Error while deleting the cita', error);
    }
};
