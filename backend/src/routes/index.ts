import { Application } from "express";

import authRoute from "../routes/auth";
import userRoute from "../routes/user";
import quizRoute from "../routes/quiz";
import { checkIsAuthenticated } from "../middleware/is-authenticated";

export const initRoutes = (app: Application) => {
  app.use(authRoute);
  app.use(checkIsAuthenticated);
  app.use(userRoute);
  app.use(quizRoute);
};
