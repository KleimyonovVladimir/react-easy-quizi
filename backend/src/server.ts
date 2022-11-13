import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

import { config } from "./config";
import { loaders } from "./loaders";

const app = express();

const start = () => {
  loaders(app);

  app.listen(config.server.port, () => {
    console.log(`Server started on port ${config.server.port}`);
  });
};

export default { start };
