import { Application } from "express";

import { initExpress } from "./express";
import { initSession } from "./session";
import { initRoutes } from "../routes";
import { initSwagger } from "./swagger";

export const loaders = (app: Application) => {
  initSwagger(app);
  initExpress(app);
  initSession(app);
  initRoutes(app);
};
