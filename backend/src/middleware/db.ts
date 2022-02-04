import { mongoConnect } from "../utils/database.js";
import { Request, Response, NextFunction } from "express";

export const setMongoConnection = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Setting mongo connection`);
  try {
    await mongoConnect();
    next();
  } catch (err) {
    next(err);
  }
};
