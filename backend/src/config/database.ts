import { Dialect } from "sequelize";

export const database = {
  name: process.env.MYSQL_DATABASE || "",
  user: process.env.MYSQL_USER || "",
  password: process.env.MYSQL_PASSWORD || "",
  otherOptions: {
    dialect: "mysql" as Dialect,
    host: process.env.MYSQL_DB_HOST || "localhost",
    define: {
      timestamps: false,
      underscored: true,
    },
  },
};
