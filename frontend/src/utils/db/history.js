import api from "../api/api";

export const getHistorial = async () => {
    try {
        const response = await api.get("/historial-clinico");
        return response.data;
    } catch (error) {
        throw Error("Error al obtener el historial clínico", error);
    }
};

export const getHistorialById = async (id) => {
    try {
        const response = await api.get(`/historial-clinico/${id}`);
        return response.data;
    } catch (error) {
        throw Error("Error al obtener el historial clínico", error);
    }
};

export const getHistorialByCenter = async (centerId) => {
    try {
        const response = await api.get(`/historial-clinico/centro/${centerId}`);
        return response.data;
    } catch (error) {
        throw Error("Error al obtener el historial clínico", error);
    }
};

export const createHistorial = async (historial) => {
    try {
        const response = await api.post("/historial-clinico", historial);
        return response.data;
    } catch (error) {
        throw Error("Error al crear el historial clínico", error);
    }
};

export const updateHistorial = async (historial) => {
    try {
        const response = await api.put(`/historial-clinico/${historial.id}`, historial);
        return response.data;
    } catch (error) {
        throw Error("Error al actualizar el historial clínico", error);
    }
};

export const deleteHistorial = async (id) => {
    try {
        const response = await api.delete(`/historial-clinico/${id}`);
        return response.data;
    } catch (error) {
        throw Error("Error al eliminar el historial clínico", error);
    }
};
