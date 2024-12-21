exports.up = (pgm) => {
    pgm.createTable("employee_services", {
        id: "id", // ID serial y PK
        employee_id: { type: "integer", notNull: true, references: "employees", onDelete: "cascade" },
        service_id: { type: "integer", notNull: true, references: "services", onDelete: "cascade" },
        created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("employee_services");
}