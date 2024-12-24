require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const serviceRoutes = require("./routes/serviceRoutes.cjs");
const paymentRoutes = require('./routes/paymentRoutes.cjs');

const app = express();
const PORT = 3000;

app.use(cors());

// Middleware to serve static files
app.use(express.static(path.resolve(__dirname, "../../dist/frontend")));

// Middleware to parse JSON
app.use(express.json());

// Use service routes
app.use("/api", serviceRoutes);

// Use payment routes
app.use('/api/payments', paymentRoutes);

// Test endpoint
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hola desde el backend con Express" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
