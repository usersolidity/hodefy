import { Request, Response, NextFunction } from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

export const uploadPictures = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.array("files", 10);
  next();
};

export const uploadPicturesToS3 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
