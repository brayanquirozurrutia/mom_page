import fs from "fs";
import path from "path";

const migrationsDir = "./src/backend/migrations"; // Ruta de las migraciones

// Lee todos los archivos en el directorio de migraciones
fs.readdir(migrationsDir, (err, files) => {
    if (err) {
        console.error("Error al leer el directorio de migraciones:", err);
        process.exit(1);
    }

    // Filtra los archivos con extensión .js
    const jsFiles = files.filter(file => path.extname(file) === ".js");

    // Renombra cada archivo de .js a .cjs
    jsFiles.forEach(file => {
        const oldPath = path.join(migrationsDir, file);
        const newPath = path.join(migrationsDir, file.replace(".js", ".cjs"));

        fs.rename(oldPath, newPath, err => {
            if (err) {
                console.error(`Error al renombrar el archivo ${file}:`, err);
            } else {
                console.log(`Convertido: ${file} -> ${path.basename(newPath)}`);
            }
        });
    });
});
