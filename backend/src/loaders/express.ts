import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const initExpress = (app: Application) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "http://localhost:3000/",
      credentials: true,
      exposedHeaders: ["Set-Cookie"],
    })
  );
};
