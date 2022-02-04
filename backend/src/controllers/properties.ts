import { Request, Response, NextFunction } from "express";
import { UploadParams } from "../interfaces/aws/index.js";
import { UPLOAD_DIR } from "../constants/index.js";
import fs from 'fs';
import { client } from "../utils/s3.js";
import {upload} from '../helpers/aws/index.js';
import path from 'path';

export const uploadPicturesToS3 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const propertyId = req.params.propertyId;
  const files: any = req.files;
  console.log('the files', files)
  const attachments: [UploadParams] = files.map((elem: any) => {
    console.log('elem ', elem)
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
      Key: `user/12/properties/${propertyId}/${elem.originalname}`,
      Body: fileStream,
      ACL: "public-read",
    };
  });
  const responses = await Promise.all(
    attachments.map((param) =>  client.upload(param).promise()));
  if (!responses) {
    const error = new Error("Could not upload file, please try again")
    return next(error);
  }
  console.log('the responses ',responses)
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
    return elem?.Location;
  });
  return res.status(204).send();
};
