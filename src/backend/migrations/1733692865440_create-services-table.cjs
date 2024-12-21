exports.up = (pgm) => {
    pgm.createTable("services", {
        id: "id",
        name: { type: "text", notNull: true, unique: true },
        description: { type: "text" },
        duration: { type: "integer", notNull: true },
        price: { type: "decimal", notNull: true },
        created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("services");
}