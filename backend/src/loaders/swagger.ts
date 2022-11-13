import { Application } from "express";

import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "../swagger/schema.json";

const options = {
  explorer: true,
};

export const initSwagger = (app: Application) => {
  app.use("/api-docs", serve, setup(swaggerDocument, options));
};
