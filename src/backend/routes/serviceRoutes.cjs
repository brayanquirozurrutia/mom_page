const express = require("express");
const {
    getServices,
    getAvailableDates,
} = require("../controllers/serviceController.cjs");

const router = express.Router();

router.get("/services", getServices);
router.get("/services/:serviceId/availability", getAvailableDates);

module.exports = router;
