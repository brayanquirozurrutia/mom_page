exports.up = (pgm) => {
    pgm.createTable("employees", {
        id: "id", // ID serial y PK
        name: { type: "text", notNull: true },
        email: { type: "text", unique: true },
        phone: { type: "text", unique: true },
        created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("employees");
}