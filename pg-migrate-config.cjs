require("dotenv").config();

module.exports = {
  database_url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || "5433"}/${process.env.DB_NAME}`,
  migrations_dir: "src/backend/migrations",
  schema: "public",
};
