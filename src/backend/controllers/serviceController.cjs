const serviceModel = require("../models/serviceModel.cjs");

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

module.exports = {
    getServices,
};
