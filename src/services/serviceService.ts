import axios from "@/services/axiosConfig";

export interface Service {
    id: number;
    name: string;
}

export const fetchServices = async (): Promise<Service[]> => {
    try {
        const response = await axios.get<Service[]>("/api/services");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los servicios:", error);
        throw error;
    }
};
