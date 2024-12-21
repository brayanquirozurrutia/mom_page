exports.up = (pgm) => {
    pgm.createTable("employee_work_days", {
        id: "id", // ID serial y PK
        employee_id: { type: "integer", notNull: true, references: "employees", onDelete: "cascade" },
        day_of_week: { type: "integer", notNull: true }, // 0 = Domingo, 6 = Sábado
        start_time: { type: "time", notNull: true },
        end_time: { type: "time", notNull: true },
        created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("employee_work_days");
}