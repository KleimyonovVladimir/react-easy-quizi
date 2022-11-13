import { Application } from "express";

import authRoute from "../routes/auth";
import userRoute from "../routes/user";

export const initRoutes = (app: Application) => {
  app.use(authRoute);
  app.use(userRoute);
};
