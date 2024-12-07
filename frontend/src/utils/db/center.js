import api from "../api/api";
import { getToken } from "../api/secureToken";

export const getCurrentCenter = async () => {
    const token = getToken();
    if (!token) throw new Error("No token found");

    try {
        const response = await api.get("/api/centros/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching current center:", error.response?.data || error.message);
        throw new Error("Error while fetching current center", error);
    }
};

export const createCenter = async ({ usuario, contraseña }) => {
    try {
        const response = await api.post('/api/centros', { usuario, contraseña });
        return response.data;
    } catch (error) {
        console.error("Error al crear el centro:", error);
        throw new Error(error.response ? error.response.data.message : 'Error al crear el centro');
    }
};

export const loginCenter = async (center) => {
    try {
        const response = await api.post("/api/centros/login", center);
        return response.data;
    } catch (error) {
        console.error("Error al hacer login:", error);
        throw new Error("Error while logging in the center", error);
    }
};

export const logoutCenter = async () => {
    try {
        const response = await api.post("/api/centros/logout");
        return response.data;
    } catch (error) {
        console.error("Error while logging out the center:", error);
        throw new Error("Error while logging out the center", error);
    }
};

export const checkCenterExists = async (usuario) => {
    try {
        const response = await api.get(`/api/centros/exists/${usuario}`);
        return response.data.exists; 
    } catch (error) {
        console.error("Error al verificar si el centro existe:", error);
        throw new Error("Error al verificar si el centro existe", error.message);
    }
};
