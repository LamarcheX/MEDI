import api from "../api/api";
import { getToken } from "../api/secureToken";

export const getCurrentCenter = async () => {
    const token = getToken();
    if (!token) throw new Error("No token found");

    try {
        const response = await api.get("/api/centros/me");
        return response.data;
    } catch (error) {
        console.error("Error fetching current center:", error.response?.data || error.message);
        throw new Error("Error while fetching current center", error);
    }
};

export const createCenter = async (center) => {
    try {
        const response = await api.post("/api/centros", center);
        return response.data;
    } catch (error) {
        throw new Error("Error while creating the center", error);
    }
};

export const loginCenter = async (center) => {
    try {
        const response = await api.post("/api/centros/login", center);
        return response.data;
    } catch (error) {
        throw new Error("Error while logging in the center", error);
    }
};

export const logoutCenter = async () => {
    try {
        const response = await api.post("/api/centros/logout");
        return response.data;
    } catch (error) {
        throw new Error("Error while logging out the center", error);
    }
};
