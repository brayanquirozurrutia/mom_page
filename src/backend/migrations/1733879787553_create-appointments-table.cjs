exports.up = (pgm) => {
    pgm.createTable("appointments", {
        id: "id", // ID serial y PK
        employee_id: { type: "integer", notNull: true, references: "employees", onDelete: "cascade" },
        service_id: { type: "integer", notNull: true, references: "services", onDelete: "cascade" },
        client_name: { type: "text", notNull: true },
        client_phone: { type: "text", notNull: true },
        appointment_date: { type: "date", notNull: true },
        appointment_time: { type: "time", notNull: true },
        created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("appointments");
}