import { Dialect } from "sequelize";

export const database = {
  name: "easy_quizi_db",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  otherOptions: {
    dialect: "mysql" as Dialect,
    host: process.env.MYSQL_URL || "localhost",
    define: {
      timestamps: false,
      underscored: true,
    },
  },
};
