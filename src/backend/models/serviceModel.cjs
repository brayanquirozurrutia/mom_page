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

module.exports = {
    getAllServices,
};