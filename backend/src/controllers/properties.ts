import { Request, Response, NextFunction } from "express";
import { UploadParams } from "../interfaces/aws";
import { UPLOAD_DIR } from "../constants";
import fs from 'fs';
import {upload} from '../helpers/aws';
import path from 'path';

export const uploadPicturesToS3 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files: any = req.files;
  const attachments: [UploadParams] = files.map((elem: any) => {
    if (
      !elem.mimetype.includes("jpeg") &&
      !elem.mimetype.includes("jpg") &&
      !elem.mimetype.includes("png")
    ) {
      const error = new Error(
        "Please submit one of the following formats: .jpeg, .jpg, .png"
      );      
      return next(error);
    }
    const fileStream = fs.createReadStream(elem.path);
    fileStream.on("error", function (err) {
      const error = new Error(
        "Could not upload file, please try again"
      );
      return next(error);
    });
    return {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `user/${req.body.userId}/properties/${req.body.propertyId}`,
      Body: fileStream,
      ACL: "public-read",
    };
  });
  const responses = await Promise.all(
    attachments.map((param) => upload(param, console.log('done')))
  );
  if (!responses) {
    const error = new Error("Could not upload file, please try again")
    return next(error);
  }
  // Delete files
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(UPLOAD_DIR, file), err => {
        if (err) throw err;
      });
    }
  });
  const links = responses.map(elem => {
    return elem.Location;
  });
  return res.status(204).send();
};
