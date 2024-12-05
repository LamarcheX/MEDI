import api from '../api/api';

export const getAllCitas = async () => {
    try {
        const response = await api.get('/api/citas');
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

export const createCita = async (cita) => {
    try {
        const response = await api.post('/api/citas', cita);
        return response.data;
    } catch (error) {
        throw new Error('Error while creating the cita', error);
    }
};

export const updateCita = async (cita) => {
    try {
        const response = await api.put(`/api/citas/${cita._id}`, cita);
        return response.data;
    } catch (error) {
        throw new Error('Error while updating the cita', error);
    }
};

export const deleteCita = async (citaId) => {
    try {
        const response = await api.delete(`/api/citas/${citaId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error while deleting the cita', error);
    }
};
