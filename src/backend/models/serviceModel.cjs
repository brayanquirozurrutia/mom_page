const pool = require("../database.cjs");

/**
 * Get all services
 * @returns {Promise<*>} - All services
 */
const getAllServices = async () => {
    const query = "SELECT id, name FROM services";
    const result = await pool.query(query);
    return result.rows;
};


/**
 * Get the duration of a service
 * @param serviceId - ID of the service
 * @returns {Promise<*>} - Duration of the service
 */
async function getServiceDuration(serviceId) {
    const query = `
        SELECT duration
        FROM services
        WHERE id = $1
    `;
    const result = await pool.query(query, [serviceId]);
    if (result.rows.length === 0) {
        throw new Error('El servicio no existe.');
    }
    return result.rows[0].duration;
}

/**
 * Get the work days and hours of the employees that provide a service.
 * @param {number} serviceId - ID of the service
 * @returns {Promise<Array>} - Work days and hours of the employees
 */
async function getWorkDaysByServiceId(serviceId) {
    const query = `
        SELECT 
            e.id AS employee_id, 
            e.name AS employee_name, 
            e.email AS employee_email, 
            e.phone AS employee_phone, 
            ewd.day_of_week, 
            ewd.start_time, 
            ewd.end_time
        FROM employee_services es
        INNER JOIN employees e ON es.employee_id = e.id
        INNER JOIN employee_work_days ewd ON e.id = ewd.employee_id
        WHERE es.service_id = $1
        ORDER BY e.id, ewd.day_of_week
    `;
    const result = await pool.query(query, [serviceId]);
    return result.rows;
}

module.exports = {
    getAllServices,
    getWorkDaysByServiceId,
    getServiceDuration,
};
