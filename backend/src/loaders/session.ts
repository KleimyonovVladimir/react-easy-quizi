import { Application } from "express";
import session from "express-session";
import { passport } from "../passportInit";

export const initSession = (app: Application) => {
  const createdSession = session({
    secret: process.env.SESSION_SECRET_KEY || "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  });

  app.use(createdSession).use(passport.initialize()).use(passport.session());
};
