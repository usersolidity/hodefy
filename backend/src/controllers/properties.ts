import { Request, Response, NextFunction } from "express";
import { UploadParams } from "../interfaces/aws/index.js";
import { UPLOAD_DIR } from "../constants/index.js";
import { ObjectId } from "mongodb";
import fs from "fs";
import { client } from "../utils/s3.js";
import path from "path";
import { Property } from "../models/property.js";

export const saveProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAddress = req.body.ownerAddress;
  const city = req.body.city;
  const nftToken = req.body.nftToken;
  const country = req.body.country;
  const streetAddress = req.body.streetAddress;
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
      const error = new Error("Could not upload file, please try again");
      return next(error);
    });
    return {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `user/${userAddress}/properties/${elem.originalname}`,
      Body: fileStream,
      ACL: "public-read",
    };
  });
  const responses = await Promise.all(
    attachments.map((param) => client.upload(param).promise())
  );
  if (!responses) {
    const error = new Error("Could not upload file, please try again");
    return next(error);
  }
  // Delete files
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(UPLOAD_DIR, file), (err) => {
        if (err) throw err;
      });
    }
  });
  const links = responses.map((elem) => {
    return elem?.Location;
  });
  const newProperty = new Property(userAddress, links, nftToken, city, country, streetAddress);
  const savedProperty = await newProperty.save();
  return res.status(201).json({ propertyId: savedProperty.insertedId });
};

export const fetchPropertyById = async (req: Request, res: Response) => {
  const propertyId = new ObjectId(req.params.propertyId);

  const property = await Property.findById(propertyId);
  return res.status(200).json(property);
};

export const fetchPropertiesByLocation = async (req: Request, res: Response) => {
  const query = {...req.query};
  console.log('the query ',req.query)
  const property = await Property.findManyByLocation(query);
  console.log(property)
  return res.status(200).json(property);
};