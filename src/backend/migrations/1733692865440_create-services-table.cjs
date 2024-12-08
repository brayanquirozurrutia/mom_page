exports.up = (pgm) => {
    pgm.createTable("services", {
        id: "id", // Crea un campo ID como primary key serial
        name: { type: "text", notNull: true, unique: true },
        value: { type: "text", notNull: true, unique: true },
        created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
    });

    // Insertar valores iniciales
    pgm.sql(`
    INSERT INTO services (name, value) VALUES
    ('Corte de cabello', 'haircut'),
    ('Manicure', 'manicure'),
    ('Pedicure', 'pedicure'),
    ('Masaje', 'massage');
  `);
};

exports.down = (pgm) => {
    pgm.dropTable("services");
};
