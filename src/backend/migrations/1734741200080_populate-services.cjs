exports.up = (pgm) => {
    pgm.sql(`
        INSERT INTO services (name, description, duration, price) VALUES
            ('Lectura rápida', 'Lectura de 3 preguntas', 30, 15),
            ('Lectura profunda', 'Lectura de 6 preguntas', 60, 25),
            ('Limpieza', 'Limpieza con leche', 60, 30.00),
            ('Lectura de amor', 'Lectura enfocada al corazón', 90, 50);
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DELETE FROM services;
    `);
}