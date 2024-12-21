exports.up = (pgm) => {
    pgm.createTable("employee_absences", {
        id: "id", // ID serial y PK
        employee_id: { type: "integer", notNull: true, references: "employees", onDelete: "cascade" },
        absence_date: { type: "date", notNull: true },
        reason: { type: "text" },
        created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("employee_absences");
}