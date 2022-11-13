import server from "./server";
import database from "./database";
import { initModels } from "./models";

(async () => {
  try {
    await database.connection();
    initModels();
    server.start();
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
})();
