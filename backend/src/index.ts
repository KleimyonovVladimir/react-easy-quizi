import server from "./server";
import database from "./database";
import { initModels } from "./models";
import { initialDBInitialization } from "./utils/initialDBScript";

(async () => {
  try {
    await database.connection();
    await initModels();
    await initialDBInitialization();

    server.start();
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
})();
