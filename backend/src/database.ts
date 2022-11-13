import { Sequelize } from "sequelize";
import { config } from "./config";

export const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  config.database.otherOptions
);

const connection = () =>
  new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        sequelize.sync({ logging: false });
        console.log(`Database ${config.database.name} connected successfully`);

        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });

export default {
  connection,
};
