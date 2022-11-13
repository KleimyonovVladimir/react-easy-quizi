import { Application } from "express";

import { initExpress } from "./express";
import { initSession } from "./session";
import { initRoutes } from "../routes";

export const loaders = (app: Application) => {
  initExpress(app);
  initSession(app);
  initRoutes(app);
};
