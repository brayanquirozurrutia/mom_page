exports.up = (pgm) => {
    pgm.sql(`
        INSERT INTO employees (name, email, phone) VALUES
            ('Juan Pérez', 'juan.perez@example.com', '555-1234'),
            ('María López', 'maria.lopez@example.com', '555-5678'),
            ('Carlos García', 'carlos.garcia@example.com', '555-9012'),
            ('Ana Torres', 'ana.torres@example.com', '555-3456'),
            ('Luis Fernández', 'luis.fernandez@example.com', '555-7890');
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DELETE FROM employees;
    `);
}