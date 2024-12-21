import {ref} from "vue";
import { fetchServiceAvailability } from "@/services/serviceService";
import {transformToAvailableDatesWithTimes} from "@/utils/transformUtils";

/**
 * Composable to get the service availability.
 */
export const useServiceAvailability = () => {
    const availableDatesWithTimes = ref<Record<string, string[]>>({});

    const fetchAndTransformData = async (serviceId: number) => {
        try {
            const response = await fetchServiceAvailability(serviceId); // Call the service to get the availability
            availableDatesWithTimes.value = transformToAvailableDatesWithTimes(response);
        } catch (error) {
            console.error("Error al obtener disponibilidad:", error);
            throw error;
        }
    };

    return {
        availableDatesWithTimes,
        fetchAndTransformData,
    };
};
