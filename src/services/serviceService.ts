import axios from "@/services/axiosConfig";

export interface Service {
    id: number;
    name: string;
}

/**
 * Get all services
 */
export const fetchServices = async (): Promise<Service[]> => {
    try {
        const response = await axios.get<Service[]>("/api/services");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los servicios:", error);
        throw error;
    }
};

/**
 * Get the availability of a service
 * @param serviceId The id of the service
 */
export const fetchServiceAvailability = async (serviceId: number): Promise<Record<string, string[]>> => {
    try {
        const response = await axios.get<Record<string, string[]>>(`/api/services/${serviceId}/availability`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener disponibilidad:", error);
        throw error;
    }
};