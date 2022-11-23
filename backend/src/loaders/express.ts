import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const initExpress = (app: Application) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ credentials: true }));
};
