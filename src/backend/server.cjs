const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde el frontend compilado
app.use(express.static(path.resolve(__dirname, "../../dist/frontend")));

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hola desde el backend con Express" });
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
