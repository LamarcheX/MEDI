import api from "../api/api";

export const getHistorial = async () => {
    try {
        const response = await api.get("/api/historial-clinico");
        return response.data;
    } catch (error) {
        throw Error("Error al obtener el historial clínico", error);
    }
};

export const getHistorialById = async (id) => {
    try {
        const response = await api.get(`/api/historial-clinico/${id}`);
        return response.data;
    } catch (error) {
        throw Error("Error al obtener el historial clínico", error);
    }
};

export const getHistorialByCenter = async (payload) => {
    const { idCentro, queries = {} } = payload;
    try {
        const response = await api.get(`/api/historial-clinico/byCenter/${idCentro}`, { params: queries });
        return response.data;
    } catch (error) {
        throw Error("Error al obtener el historial clínico", error);
    }
};

export const createHistorial = async (historial) => {
    try {
        const response = await api.post("/api/historial-clinico", historial);
        return response.data;
    } catch (error) {
        throw Error("Error al crear el historial clínico", error);
    }
};

export const updateHistorial = async (historial) => {
    try {
        const response = await api.put(`/api/historial-clinico/${historial.id}`, historial);
        return response.data;
    } catch (error) {
        throw Error("Error al actualizar el historial clínico", error);
    }
};

export const deleteHistorial = async (id) => {
    try {
        const response = await api.delete(`/api/historial-clinico/${id}`);
        return response.data;
    } catch (error) {
        throw Error("Error al eliminar el historial clínico", error);
    }
};
