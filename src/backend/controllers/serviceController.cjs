const serviceModel = require("../models/serviceModel.cjs");
const moment = require("moment");

/**
 * Controller to get all services
 * @param req - Request
 * @param res - Response
 * @returns {Promise<void>} - The response with the services
 */
const getServices = async (req, res) => {
    try {
        const services = await serviceModel.getAllServices();
        res.json(services);
    } catch (error) {
        console.error("Error al obtener los servicios:", error.message);
        res.status(500).json({ message: "Error al obtener los servicios" });
    }
};

/**
 * Get all dates for a specific day of the week
 * @param dayOfWeek - Day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
 * @returns {*[]} - List of dates
 */
const getDatesForDayOfWeek = (dayOfWeek) => {
    const today = moment(); // Current date
    const lastDayOfMonth = moment().endOf("month"); // Last day of the month
    const dates = [];

    let current = today.clone().isoWeekday(dayOfWeek + 1); // Convert 0-6 to 1-7
    if (current.isBefore(today)) {
        current.add(1, "week"); // Move to next week
    }

    while (current.isSameOrBefore(lastDayOfMonth)) {
        dates.push(current.format("YYYY-MM-DD"));
        current.add(1, "week"); // Move to next week
    }

    return dates;
};

/**
 * Generate time blocks based on start_time, end_time and duration.
 * @param {string} startTime - Start time (HH:mm:ss)
 * @param {string} endTime - End time (HH:mm:ss)
 * @param {number} duration - Duration in minutes
 * @returns {Array<string>} - Time blocks list
 */
const generateTimeBlocks = (startTime, endTime, duration) => {
    const blocks = [];
    let current = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);

    while (current < end) {
        blocks.push(current.toISOString().substring(11, 19));
        current = new Date(current.getTime() + duration * 60 * 1000); // Increase the current time by the duration
    }

    return blocks;
};

/**
 * Get available dates for a specific service
 * @param req - Request
 * @param res - Response
 * @returns {Promise<void>} - The response with the available dates
 */
const getAvailableDates = async (req, res) => {
    try {
        const { serviceId } = req.params;

        if (!serviceId) {
            return res.status(400).json({ error: 'El ID del servicio es obligatorio.' });
        }

        const [workDays, serviceDuration] = await Promise.all([
            serviceModel.getWorkDaysByServiceId(serviceId),
            serviceModel.getServiceDuration(serviceId),
        ]);

        if (workDays.length === 0) {
            return res.status(404).json({ message: 'No se encontraron días de trabajo para este servicio.' });
        }

        // Group work days by employee and generate dynamic dates
        const groupedData = workDays.reduce((acc, item) => {
            let employee = acc.find(e => e.employee_id === item.employee_id);
            if (!employee) {
                employee = {
                    employee_id: item.employee_id,
                    employee_name: item.employee_name,
                    employee_email: item.employee_email,
                    employee_phone: item.employee_phone,
                    work_days: [],
                };
                acc.push(employee);
            }

            // Calculate dynamic dates for the day of the week
            const availableDates = getDatesForDayOfWeek(item.day_of_week);

            employee.work_days.push({
                start_time: item.start_time,
                end_time: item.end_time,
                dates: availableDates, // Add dynamic dates
                blocks: generateTimeBlocks(item.start_time, item.end_time, serviceDuration),
            });

            return acc;
        }, []);

        res.status(200).json(groupedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los días de trabajo.' });
    }
};

module.exports = {
    getServices,
    getAvailableDates,
};
